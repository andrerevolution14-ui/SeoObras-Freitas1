import sharp from 'sharp';
import {mkdir, mkdtemp, readdir, rm, stat} from 'node:fs/promises';
import {resolve, join} from 'node:path';
import {tmpdir} from 'node:os';
import {execFileSync} from 'node:child_process';
import {ATLAS} from '../components/capa/MobileFrames.ts';

// PORTRAIT_SOURCE_DIR contains the approved native 9:16 Flow exports.
const source = process.env.PORTRAIT_SOURCE_DIR;
const ffmpeg = process.env.FFMPEG_PATH;
if (!source || !ffmpeg) throw new Error('Set PORTRAIT_SOURCE_DIR and FFMPEG_PATH');
const destination = resolve('public/capa-media/4083ece1d08f/mobile-native-v1');
const clips = {
  kitchen: '01-cozinha-flow-9x16.mp4',
  bathroom: '03-casa-de-banho-flow-9x16.mp4',
};
let bytes = 0;
for (const [room, file] of Object.entries(clips)) {
  const temporary = await mkdtemp(join(tmpdir(), 'freitas-native-'));
  try {
    await mkdir(join(destination, room), {recursive: true});
    execFileSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', '-i', resolve(source, file),
      '-vf', `fps=24,scale=${ATLAS.width}:${ATLAS.height}:flags=lanczos`,
      '-frames:v', String(ATLAS.count), join(temporary, '%03d.png')]);
    if ((await readdir(temporary)).length !== ATLAS.count) throw new Error(`${room}: incomplete frame sequence`);
    for (let sheet = 0; sheet < ATLAS.count / ATLAS.frames; sheet++) {
      const frames = Array.from({length: ATLAS.frames}, (_, cell) =>
        join(temporary, `${String(sheet * ATLAS.frames + cell + 1).padStart(3, '0')}.png`));
      const output = join(destination, room, `${String(sheet).padStart(2, '0')}.webp`);
      await sharp({create: {width: ATLAS.columns * ATLAS.width,
        height: Math.ceil(ATLAS.frames / ATLAS.columns) * ATLAS.height, channels: 3, background: '#171614'}})
        .composite(frames.map((input, i) => ({input, left: i % ATLAS.columns * ATLAS.width,
          top: Math.floor(i / ATLAS.columns) * ATLAS.height})))
        .webp({quality: 82, effort: 4}).toFile(output);
      bytes += (await stat(output)).size;
    }
    if (room === 'kitchen') {
      await sharp(join(temporary, '001.png')).webp({quality: 88}).toFile(join(destination, 'poster.webp'));
      await sharp(join(temporary, `${ATLAS.count}.png`)).webp({quality: 88}).toFile(join(destination, 'after.webp'));
    }
    console.log(`${room}: ${ATLAS.count} native portrait frames`);
  } finally {
    await rm(temporary, {recursive: true, force: true});
  }
}
console.log(`${(bytes / 1024 / 1024).toFixed(2)} MiB, ${ATLAS.width}×${ATLAS.height} (9:16)`);
