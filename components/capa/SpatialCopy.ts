/** Foreground contours are in the source footage's 1280 × 720 coordinate space.
 * The same camera projection and the actual decoded frame drive image and stencil.
 * Only the text is erased: the original image pixels remain untouched.
 */
export type CameraProjection={room:number,frame:number,x:number,y:number,scale:number};
type Point=[number,number];
const clamp=(n:number)=>Math.max(0,Math.min(1,n));
const ease=(n:number)=>{const t=clamp(n);return t*t*(3-2*t);};
const range=(p:number,a:number,b:number)=>clamp((p-a)/(b-a));
const polygon=(ctx:CanvasRenderingContext2D,points:Point[])=>{ctx.beginPath();points.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.closePath();ctx.fill();};
function island(ctx:CanvasRenderingContext2D,renovated:boolean){
 ctx.beginPath();
 if(renovated){ctx.moveTo(344,434);ctx.quadraticCurveTo(349,419,427,415);ctx.lineTo(605,402);ctx.lineTo(814,382);ctx.lineTo(962,379);ctx.lineTo(1114,395);ctx.lineTo(1114,549);ctx.lineTo(791,720);ctx.lineTo(409,744);ctx.lineTo(345,687);}
 else{ctx.moveTo(338,430);ctx.quadraticCurveTo(341,418,448,409);ctx.lineTo(590,401);ctx.lineTo(817,382);ctx.lineTo(928,379);ctx.lineTo(1117,397);ctx.lineTo(1117,543);ctx.lineTo(919,648);ctx.lineTo(670,740);ctx.lineTo(405,741);ctx.lineTo(345,675);}
 ctx.closePath();ctx.fill();
 // The bowl and hob project above the island's rear contour.
 ctx.beginPath();if(renovated){ctx.moveTo(427,403);ctx.quadraticCurveTo(500,392,573,401);ctx.quadraticCurveTo(562,437,501,439);ctx.quadraticCurveTo(439,436,427,403);}else{ctx.moveTo(451,408);ctx.quadraticCurveTo(509,398,568,408);ctx.quadraticCurveTo(561,438,510,441);ctx.quadraticCurveTo(460,437,451,408);}ctx.fill();
 if(!renovated){
  polygon(ctx,[[596,400],[752,389],[801,402],[643,419]]);
  // Fruit and the ceramic jar also sit in front of the floating title.
  ctx.beginPath();ctx.ellipse(499,401,22,14,0,0,Math.PI*2);ctx.ellipse(524,400,23,14,0,0,Math.PI*2);ctx.fill();
  ctx.beginPath();ctx.moveTo(929,358);ctx.quadraticCurveTo(922,350,942,344);ctx.lineTo(944,338);ctx.lineTo(952,338);ctx.lineTo(955,344);ctx.quadraticCurveTo(975,349,967,358);ctx.lineTo(970,386);ctx.quadraticCurveTo(948,399,927,387);ctx.closePath();ctx.fill();
 }
}
export function drawSpatialCopy(ctx:CanvasRenderingContext2D,width:number,height:number,dpr:number,p:number,camera:CameraProjection|null,mobile:boolean,fontFamily:string){
 ctx.setTransform(1,0,0,1,0,0);ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
 if(!camera)return "";
 let name="",opacity=0,lead="",accent="",base=0,sourceCenter=680;
 if(camera.room===0&&p<(mobile?.065:.05)){
  name="island";lead="Uma nova vida";accent="para a sua casa.";
  base=260+215*ease(range(p,0,.055));
  opacity=1-ease(range(p,mobile?.058:.045,mobile?.065:.05));
 }else if(camera.room===0&&camera.frame>=184&&p>=.395&&p<.42){
  name="new-island";lead="Outra luz.";accent="Mais vida.";sourceCenter=615;
  base=425-210*ease(range(p,.395,.418));opacity=ease(range(p,.395,.398))*(1-ease(range(p,.417,.42)));

 }
 if(!name||opacity<.001)return "";
 const {x,y,scale}=camera;
 const wideMobile=mobile&&width>height;
 let fontSize=Math.min(mobile?width*(wideMobile?.065:.126):width*.088,mobile?60:140);
 const maxWidth=mobile?width*(wideMobile?.43:.88):Math.min(width*.74,scale*770);
 ctx.setTransform(dpr,0,0,dpr,0,0);
 ctx.font=`400 ${fontSize*.94}px ${fontFamily}`;
 let measured=ctx.measureText(lead).width;
 ctx.font=`italic 400 ${fontSize*1.06}px ${fontFamily}`;measured=Math.max(measured,ctx.measureText(accent).width);
 if(measured>maxWidth)fontSize*=maxWidth/measured;
 // Titles stay in the same room coordinates as the object; only the responsive size changes.
 const center=mobile?width*(wideMobile?.27:.5):x+sourceCenter*scale;
 const baseline=y+base*scale,lineGap=fontSize*1.08;
 ctx.globalAlpha=opacity;ctx.textAlign="center";ctx.textBaseline="alphabetic";
 ctx.shadowColor="rgba(12,23,17,.32)";ctx.shadowBlur=18;ctx.shadowOffsetY=2;
 ctx.fillStyle="#fffaf1";ctx.font=`400 ${fontSize*.94}px ${fontFamily}`;ctx.fillText(lead,center,baseline);
 ctx.fillStyle="#e8d5b8";ctx.font=`italic 400 ${fontSize*1.06}px ${fontFamily}`;ctx.fillText(accent,center+fontSize*.035,baseline+lineGap);
 ctx.shadowBlur=0;ctx.shadowOffsetY=0;ctx.globalAlpha=1;
 ctx.globalCompositeOperation="destination-out";ctx.fillStyle="#000";
 ctx.setTransform(dpr*scale,0,0,dpr*scale,dpr*x,dpr*y);
 island(ctx,name==="new-island");
 ctx.globalCompositeOperation="source-over";ctx.setTransform(1,0,0,1,0,0);
 return name;
}
