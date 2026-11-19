"use client";

import {useEffect, useRef, useState} from "react";
import {ArrowDown, Pause, Play} from "lucide-react";
import {createFilmSpeed, wheelDistance} from "./FilmSpeed";
import {filmCopyAt} from "./FilmCopy";
import {createHeroPlayback, holdHeroPage, type HeroPhase} from "./HeroPlayback";

export default function IntroFilm({desktop, mobile, onChapterChange}: {desktop:string; mobile:string; onChapterChange:(chapter:number)=>void}) {
 const video = useRef<HTMLVideoElement>(null), speedLabel = useRef<HTMLSpanElement>(null);
 const playback = useRef<ReturnType<typeof createHeroPlayback> | null>(null);
 const [phase, setPhase] = useState<HeroPhase>("idle"), [ready, setReady] = useState(false);
 useEffect(() => {
  const el = video.current, hero = el?.closest<HTMLElement>(".film-hero");
  if (!el || !hero) return;
  const portrait = window.matchMedia("(max-width:700px) and (orientation:portrait)");
  let visible = false, touchPoint: {x:number;y:number} | null = null, watchdog: ReturnType<typeof setTimeout> | undefined;
  let lastChapter = -1;
  const syncCopy = () => {
   const next = filmCopyAt(el.currentTime);
   // Only update React at chapter boundaries; playback remains entirely native.
   if(next !== lastChapter) { lastChapter = next; onChapterChange(next); }
  };
  const clearWatchdog = () => { clearTimeout(watchdog); watchdog = undefined; };
  const attach = () => {
   const src = portrait.matches ? mobile : desktop;
   if (el.getAttribute("src") !== src) { setReady(false); el.src = src; el.load(); }
  };
  const speed = createFilmSpeed(rate => {
   el.playbackRate=rate;
   const label=speedLabel.current;
   if(label) {
    label.hidden=rate<1.08;
    label.textContent=`${rate.toFixed(1).replace(".",",")}×`;
   }
  }, {now:()=>performance.now(),request:callback=>requestAnimationFrame(callback),cancel:id=>cancelAnimationFrame(id)});
  const controller = createHeroPlayback({
   play: () => { attach(); el.muted = true; return el.play(); },
   pause: () => el.pause(), hold: () => holdHeroPage(hero),
   change: next => { setPhase(next); if(next!=="playing"&&next!=="starting")speed.reset(); if (next !== "starting") clearWatchdog(); else armWatchdog(); },
  });
  playback.current = controller;
  const armWatchdog = () => {
   clearWatchdog();
   // Failed/blocked playback must always restore normal page navigation.
   watchdog = setTimeout(() => { if (controller.phase === "starting" || controller.phase === "playing") controller.fail(); }, 8000);
  };
  const atStart = () => controller.phase === "idle" && visible && !document.hidden && Math.abs(hero.getBoundingClientRect().top) < 12;
  const interactive = (target: EventTarget | null) => target instanceof Element && !!target.closest('a,button,input,textarea,select,[contenteditable="true"],[role="dialog"],.gf-mobile-menu');
  const gestureControl = (target: EventTarget | null) => target instanceof Element && !!target.closest('input,textarea,select,[contenteditable="true"],[role="dialog"],.gf-mobile-menu');
  const scrollIntent = (distance:number) => {
   if(atStart()) { controller.start(); return true; }
   if(visible&&!document.hidden&&controller.phase==="playing") { speed.push(distance); return true; }
   return false;
  };
  const wheel = (event: WheelEvent) => {
   const distance=wheelDistance(event.deltaY,event.deltaMode,window.innerHeight);
   if (event.ctrlKey || event.shiftKey || distance <= 0 || Math.abs(event.deltaX) > event.deltaY || gestureControl(event.target)) return;
   if(scrollIntent(distance))event.preventDefault();
  };
  const touchStart = (event: TouchEvent) => { touchPoint = event.touches.length === 1 ? {x:event.touches[0].clientX,y:event.touches[0].clientY} : null; };
  const touchEnd = () => { touchPoint=null; };
  const touchMove = (event: TouchEvent) => {
   if(event.touches.length!==1) { touchPoint=null; return; }
   if (!touchPoint || gestureControl(event.target)) return;
   const touch=event.touches[0],distance=touchPoint.y-touch.clientY,horizontal=Math.abs(touchPoint.x-touch.clientX);
   if(distance< (controller.phase==="idle"?10:3) || horizontal>distance)return;
   touchPoint={x:touch.clientX,y:touch.clientY};
   if(scrollIntent(distance))event.preventDefault();
  };
  const key = (event: KeyboardEvent) => {
   if (event.key === "Escape" && ["starting","playing","paused"].includes(controller.phase)) { controller.skip(); return; }
   if (event.shiftKey || event.ctrlKey || event.metaKey || interactive(event.target)) return;
   if (["ArrowDown","PageDown"," "].includes(event.key) && scrollIntent(event.key==="ArrowDown"?80:350))event.preventDefault();
  };
  const link = (event: MouseEvent) => {
   if (event.target instanceof Element && event.target.closest("a[href]") && ["starting","playing","paused"].includes(controller.phase)) controller.skip();
  };
  const visibility = () => { if (document.hidden) controller.suspend(); else if (visible) controller.resume(); };
  const playing = () => { clearWatchdog(); setReady(true); syncCopy(); };
  const waiting = () => { if (["starting","playing"].includes(controller.phase)) armWatchdog(); };
  const error = () => controller.fail();
  const ended = () => { syncCopy(); controller.finish(); };
  const orientation = () => { if (visible && ["idle","complete","released"].includes(controller.phase)) attach(); };
  const observer = new IntersectionObserver(([entry]) => {
   visible = entry.isIntersecting;
   if (visible) { if (controller.phase === "idle") attach(); controller.resume(); }
   else controller.suspend();
  }, {threshold:0.05});
  observer.observe(hero);
  window.addEventListener("wheel",wheel,{passive:false});
  window.addEventListener("touchstart",touchStart,{passive:true});
  window.addEventListener("touchmove",touchMove,{passive:false});
  window.addEventListener("touchend",touchEnd,{passive:true}); window.addEventListener("touchcancel",touchEnd,{passive:true});
  window.addEventListener("keydown",key); document.addEventListener("click",link,true);
  document.addEventListener("visibilitychange",visibility); portrait.addEventListener("change",orientation);
  el.addEventListener("playing",playing); el.addEventListener("waiting",waiting); el.addEventListener("stalled",waiting);
  el.addEventListener("timeupdate",syncCopy); el.addEventListener("loadedmetadata",syncCopy); el.addEventListener("seeked",syncCopy);
  el.addEventListener("ended",ended); el.addEventListener("error",error);
  return () => {
   clearWatchdog(); observer.disconnect(); controller.dispose(); speed.dispose(); playback.current = null;
   window.removeEventListener("wheel",wheel); window.removeEventListener("touchstart",touchStart); window.removeEventListener("touchmove",touchMove);
   window.removeEventListener("touchend",touchEnd); window.removeEventListener("touchcancel",touchEnd);
   window.removeEventListener("keydown",key); document.removeEventListener("click",link,true);
   document.removeEventListener("visibilitychange",visibility); portrait.removeEventListener("change",orientation);
   el.removeEventListener("playing",playing); el.removeEventListener("waiting",waiting); el.removeEventListener("stalled",waiting);
   el.removeEventListener("timeupdate",syncCopy); el.removeEventListener("loadedmetadata",syncCopy); el.removeEventListener("seeked",syncCopy);
   el.removeEventListener("ended",ended); el.removeEventListener("error",error);
   el.pause(); el.removeAttribute("src"); el.load();
  };
 }, [desktop,mobile,onChapterChange]);
 const running = phase === "playing" || phase === "starting";
 const toggle = () => { if (running) playback.current?.pause(); else playback.current?.start(); };
 const continuePage = () => {
  if (phase === "idle") { playback.current?.start(); return; }
  playback.current?.skip();
  document.getElementById("remodelacao")?.scrollIntoView({behavior:"smooth"});
 };
 return <>
  <video ref={video} className="ambient-film intro-film" data-phase={phase} muted playsInline preload="metadata" disablePictureInPicture
   aria-label="Filme conceptual da remodelação de uma cozinha e casa de banho" style={{opacity:ready?1:0}}/>
  <button className="film-toggle" type="button" onClick={toggle} aria-label={running?"Pausar vídeo":"Reproduzir vídeo"} title={running?"Pausar vídeo":"Reproduzir vídeo"}>
   {running?<Pause size={17}/>:<Play size={17}/>}
  </button>
  <span className="film-speed" ref={speedLabel} hidden aria-hidden="true"/>
  {running&&<span className="film-speed-help">Continue o scroll para acelerar</span>}
  <button className="film-discover" type="button" onClick={continuePage}>
   <ArrowDown size={16}/><span>{phase === "idle" ? "Faça scroll para começar" : phase === "complete" || phase === "released" ? "Continuar a descobrir" : "Passar à frente"}</span>
  </button>
 </>;
}
