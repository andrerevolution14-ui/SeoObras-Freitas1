import sharp from 'sharp';
import {mkdir, stat} from 'node:fs/promises';
import {resolve} from 'node:path';
import {spawn} from 'node:child_process';
import {once} from 'node:events';
import {portraitTracks, portraitCrop} from './portrait-framing.mjs';
import {ATLAS} from '../components/capa/MobileFrames.ts';

const root = resolve('public/capa-media/4083ece1d08f');
const destination = `${root}/mobile-portrait-v1`;
const videoDir = process.env.PORTRAIT_VIDEO_DIR;
if (videoDir && !process.env.FFMPEG_PATH) throw new Error('FFMPEG_PATH is required to export the videos');
if (videoDir) await mkdir(videoDir, {recursive:true});
let bytes = 0;

for (const room of Object.keys(portraitTracks)) {
  await mkdir(`${destination}/${room}`, {recursive:true});
  const first = `${root}/${room}-hd/001.webp`;
  const {width, height} = await sharp(first).metadata();
  let video, encoded;
  if (videoDir) {
    video = spawn(process.env.FFMPEG_PATH, ['-hide_banner','-loglevel','error','-y','-f','image2pipe','-framerate','24','-vcodec','png','-i','pipe:0','-an','-c:v','libx264','-preset','fast','-crf','18','-pix_fmt','yuv420p','-movflags','+faststart',`${videoDir}/${room}-9x16.mp4`], {stdio:['pipe','ignore','inherit']});
    encoded = once(video, 'close');
  }
  for (let sheet = 0; sheet < ATLAS.count / ATLAS.frames; sheet++) {
    const frames = await Promise.all(Array.from({length:ATLAS.frames}, async (_, cell) => {
      const frame = sheet * ATLAS.frames + cell + 1;
      const path = `${root}/${room}-hd/${String(frame).padStart(3,'0')}.webp`;
      return sharp(path).extract(portraitCrop(room,frame,width,height)).resize(ATLAS.width,ATLAS.height).png().toBuffer();
    }));
    if (video) for (const frame of frames) if (!video.stdin.write(frame)) await once(video.stdin,'drain');
    const file = `${destination}/${room}/${String(sheet).padStart(2,'0')}.webp`;
    await sharp({create:{width:ATLAS.columns*ATLAS.width,height:2*ATLAS.height,channels:3,background:'#171614'}})
      .composite(frames.map((input,i)=>({input,left:i%ATLAS.columns*ATLAS.width,top:Math.floor(i/ATLAS.columns)*ATLAS.height})))
      .webp({quality:82,effort:4}).toFile(file);
    bytes += (await stat(file)).size;
    if (room === 'kitchen' && sheet === 0) await sharp(frames[0]).webp({quality:88}).toFile(`${destination}/poster.webp`);
    if (room === 'kitchen' && sheet === 23) await sharp(frames[7]).webp({quality:88}).toFile(`${destination}/after.webp`);
  }
  if (video) {video.stdin.end(); if ((await encoded)[0] !== 0) throw new Error(`Video export failed: ${room}`);}
  console.log(`${room}: 192 portrait frames${video ? ' + 9:16 video' : ''}`);
}
console.log(`${(bytes/1024/1024).toFixed(2)} MiB, ${ATLAS.width}×${ATLAS.height} (9:16)`);
