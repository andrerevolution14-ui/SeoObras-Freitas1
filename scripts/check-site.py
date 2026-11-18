"""Check the built public site's metadata, structured data, assets and internal links.
Usage: python3 scripts/check-site.py http://127.0.0.1:4310
"""
import concurrent.futures, json, re, sys, urllib.request, urllib.error
from html.parser import HTMLParser
from urllib.parse import urlsplit, urljoin, unquote
from pathlib import Path
import xml.etree.ElementTree as ET
base=sys.argv[1].rstrip('/') if len(sys.argv)>1 else 'http://127.0.0.1:4310'
production='https://www.grupofreitasrenovacoes.pt'
def get(path):
 try:
  with urllib.request.urlopen(base+path,timeout=40) as r:return r.status,r.read().decode()
 except urllib.error.HTTPError as e:return e.code,e.read().decode()
class Page(HTMLParser):
 def __init__(self):
  super().__init__();self.meta={};self.links=[];self.images=[];self.json=[];self.h1=0;self.ids=set();self.capture=None;self.buffer='';self.title='';self.canonical=None;self.lang=None
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag=='html':self.lang=a.get('lang')
  if 'id' in a:self.ids.add(a['id'])
  if tag=='h1':self.h1+=1
  if tag=='title':self.capture='title';self.buffer=''
  if tag=='meta':self.meta[a.get('name') or a.get('property')]=a.get('content','')
  if tag=='link' and a.get('rel')=='canonical':self.canonical=a.get('href')
  if tag=='a' and a.get('href'):self.links.append(a['href'])
  if tag=='img':self.images.append(a)
  if tag=='script' and a.get('type')=='application/ld+json':self.capture='json';self.buffer=''
 def handle_data(self,data):
  if self.capture:self.buffer+=data
 def handle_endtag(self,tag):
  if tag=='title' and self.capture=='title':self.title=self.buffer;self.capture=None
  if tag=='script' and self.capture=='json':self.json.append(json.loads(self.buffer));self.capture=None
sitemap_status,xml=get('/sitemap.xml');assert sitemap_status==200
urls=[e.text for e in ET.fromstring(xml).findall('{*}url/{*}loc')]
paths=sorted(set(urlsplit(u).path or '/' for u in urls));assert '/capa' in paths
errors=[];pages={};titles={};descriptions={};assets=set();local_links=set()
for path,(status,html) in zip(paths,concurrent.futures.ThreadPoolExecutor(max_workers=6).map(get,paths)):
 if status!=200:errors.append(f'{path}: HTTP {status}');continue
 p=Page();p.feed(html);pages[path]=p
 def check(ok,message):
  if not ok:errors.append(f'{path}: {message}')
 check(p.h1==1,f'{p.h1} H1 elements');check(p.lang=='pt-PT','wrong language')
 check(0<len(p.title)<=60,f'title length {len(p.title)}: {p.title}')
 desc=p.meta.get('description','');check(0<len(desc)<=155,f'description length {len(desc)}')
 check(p.title not in titles,f'duplicate title with {titles.get(p.title)}');titles[p.title]=path
 check(desc not in descriptions,f'duplicate description with {descriptions.get(desc)}');descriptions[desc]=path
 check((p.canonical or '').rstrip('/')==urljoin(production,path).rstrip('/'),f'canonical {p.canonical}')
 for key in ['og:title','og:description','og:image','twitter:title','twitter:description','twitter:image','theme-color']:check(bool(p.meta.get(key)),f'missing {key}')
 check(p.meta.get('og:image:width')=='1200' and p.meta.get('og:image:height')=='630','social image dimensions not 1200x630')
 schemas=[]
 for data in p.json:schemas.extend(data.get('@graph',[data]))
 check(any(s.get('@type')=='HomeAndConstructionBusiness' for s in schemas),'missing business schema')
 if path!='/':check(any(s.get('@type')=='BreadcrumbList' for s in schemas),'missing breadcrumb schema')
 if path.startswith('/servicos/'):
  check(any(s.get('@type')=='Service' for s in schemas),'missing service schema')
  check(any(s.get('@type')=='FAQPage' for s in schemas),'missing FAQ schema')
 for s in schemas:
  if s.get('@type')=='FAQPage':
   for q in s['mainEntity']:
    check(q.get('@type')=='Question' and bool(q.get('name')) and bool(q.get('acceptedAnswer',{}).get('text')),'invalid FAQ item')
 for im in p.images:
  check('alt' in im,'image missing alt')
  if im.get('src','').startswith('/'):assets.add(urlsplit(im['src']).path)
 for href in p.links:
  u=urlsplit(urljoin(production+path,href))
  if u.netloc==urlsplit(production).netloc:local_links.add((u.path or '/',u.fragment))
 image=p.meta.get('og:image','')
 if image.startswith(production):assets.add(urlsplit(image).path)
for path,fragment in sorted(local_links):
 if path not in pages:
  status,html=get(path)
  if status!=200:errors.append(f'Broken internal link {path}: {status}');continue
  p=Page();p.feed(html);pages[path]=p
 if fragment and unquote(fragment) not in pages[path].ids:errors.append(f'Missing anchor {path}#{fragment}')
for path in sorted(assets):
 if path.startswith('/_next/image'):continue
 if not (Path('public')/unquote(path).lstrip('/')).is_file():errors.append(f'Missing public asset {path}')
for route in ['/robots.txt','/llms.txt']:
 status,content=get(route)
 if status!=200:errors.append(f'{route}: HTTP {status}')
 if route=='/llms.txt' and '/capa' not in content:errors.append('llms.txt missing capa')
 if route=='/robots.txt':
  for bot in ['GPTBot','ClaudeBot','PerplexityBot','Google-Extended']:
   if bot not in content:errors.append('robots.txt missing '+bot)
status,html=get('/this-page-does-not-exist')
if status!=404:errors.append(f'Unknown route returns {status}, expected 404')
result={'pages':len(paths),'internalLinks':len(local_links),'assets':len(assets),'errors':errors}
print(json.dumps(result,ensure_ascii=False,indent=2));sys.exit(bool(errors))
