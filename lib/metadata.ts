import type { Metadata } from "next";
import { CONTRACTOR_INFO } from "./constants";

const suffix = " | Freitas Renovações";
/** Titles are absolute to avoid appending the brand twice in nested layouts. */
export function seoTitle(title: string): string {
 const clean = title.replace(/\s*\|\s*Freitas Renovações$/, "").trim();
 const compact = clean.length <= 60 ? clean : clean.slice(0, 59).replace(/\s+\S*$/, "") + "…";
 return compact.length + suffix.length <= 60 ? compact + suffix : compact;
}
export function seoDescription(description: string): string {
 if (description.length <= 155) return description;
 return description.slice(0, 154).replace(/\s+\S*$/, "").replace(/[,;:]$/, "") + ".";
}
export function pageMetadata({title,description,path,image="/og-image.jpg",article=false}:{title:string;description:string;path:string;image?:string;article?:boolean}):Metadata {
 const heading=seoTitle(title),summary=seoDescription(description);
 const url=new URL(path,CONTRACTOR_INFO.website).href;
 const imageUrl=new URL(image,CONTRACTOR_INFO.website).href;
 return {
  title:{absolute:heading},description:summary,alternates:{canonical:url},
  openGraph:{title:heading,description:summary,url,siteName:CONTRACTOR_INFO.companyName,type:article?"article":"website",locale:"pt_PT",images:[{url:imageUrl,width:1200,height:630,alt:heading}]},
  twitter:{card:"summary_large_image",title:heading,description:summary,images:[imageUrl]},
 };
}
