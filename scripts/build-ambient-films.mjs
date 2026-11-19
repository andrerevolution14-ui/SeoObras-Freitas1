import {execFileSync} from 'node:child_process';
import {mkdir, stat} from 'node:fs/promises';
import {resolve, join} from 'node:path';

const ffmpeg = process.env.FFMPEG_PATH;
const source = process.env.FILM_SOURCE_DIR;
if (!ffmpeg || !source) throw new Error('Set FFMPEG_PATH and FILM_SOURCE_DIR (the outputs folder)');
const output = resolve('public/capa-media/4083ece1d08f/films-v1');
await mkdir(output, {recursive: true});

const sources = {
  desktop: ['cozinha-escolhida/remodelacao-google-flow.mp4', 'destaques-ceramica/corte-google-flow.mp4',
    'passagem-cozinha-casa-de-banho/passagem-google-flow.mp4', 'casa-de-banho-corrigida/remodelacao-google-flow.mp4',
    'assentamento-parede-v3/assentamento-encaixe-completo-v3.mp4'],
  mobile: ['flow-native-9x16/01-cozinha-flow-9x16.mp4', 'hero-vertical-9-16/ceramic-cut-9x16.mp4',
    'hero-vertical-9-16/passage-9x16.mp4', 'flow-native-9x16/03-casa-de-banho-flow-9x16.mp4',
    'hero-vertical-9-16/ceramic-lay-9x16.mp4'],
};
// Preserve the existing story: island, cutting, finished kitchen, passage,
// bathroom works, wall preparation / tile fit, then the completed bathroom.
const edit = [[0, 0, 2.5], [1, .5, 6], [0, 2.5, 5.5], [2, 0, 8], [3, 0, 2.7], [4, 0, 8], [3, 2.7, 5.3]];
for (const [format, paths] of Object.entries(sources)) {
  const [width, height] = format === 'mobile' ? [720, 1280] : [1280, 720];
  const inputs = edit.flatMap(([index]) => ['-i', resolve(source, paths[index])]);
  const filters = edit.map(([, start, duration], i) =>
    `[${i}:v]trim=start=${start}:duration=${duration},setpts=PTS-STARTPTS,fps=24,scale=${width}:${height}:flags=lanczos,setsar=1,format=yuv420p,settb=AVTB[v${i}]`);
  let duration = edit[0][2], label = 'v0';
  for (let i = 1; i < edit.length; i++) {
    filters.push(`[${label}][v${i}]xfade=transition=fade:duration=0.4:offset=${(duration - .4).toFixed(3)}[mix${i}]`);
    duration += edit[i][2] - .4;
    label = `mix${i}`;
  }
  duration += .8;
  filters.push(`[${label}]tpad=stop_mode=clone:stop_duration=0.8,fade=t=in:st=0:d=0.25,fade=t=out:st=${(duration - .35).toFixed(3)}:d=0.35,format=yuv420p[out]`);
  const file = join(output, `hero-${format}.mp4`);
  execFileSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', '-filter_complex_threads', '1', ...inputs,
    '-filter_complex', filters.join(';'), '-map', '[out]', '-an', '-c:v', 'libx264', '-threads', '2',
    '-preset', 'medium', '-crf', '24', '-maxrate', '1800k', '-bufsize', '3600k',
    '-profile:v', 'high', '-level', '3.1', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', file], {stdio: 'inherit'});
  console.log(`${format}: ${duration.toFixed(1)}s, ${((await stat(file)).size / 1024 / 1024).toFixed(2)} MiB`);
}
const assembly = join(output, 'kitchen-assembly.mp4');
execFileSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', '-i', resolve(source, 'cozinha-montagem-flow/03-montagem-cozinha.mp4'),
  '-an', '-vf', 'fps=24,scale=1280:720,setsar=1', '-c:v', 'libx264', '-threads', '2', '-preset', 'medium', '-crf', '24',
  '-pix_fmt', 'yuv420p', '-movflags', '+faststart', assembly], {stdio: 'inherit'});
console.log(`assembly: ${((await stat(assembly)).size / 1024 / 1024).toFixed(2)} MiB`);
