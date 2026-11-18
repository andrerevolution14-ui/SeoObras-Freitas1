import sharp from 'sharp';
import { mkdir, stat } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve('public/capa-media/4083ece1d08f');
const rooms = ['kitchen', 'passage', 'bathroom', 'ceramic-cut', 'ceramic-lay'];
let bytes = 0;
for (const room of rooms) {
  const output = `${root}/mobile-frames-v1/${room}`;
  await mkdir(output, { recursive: true });
  for (let sheet = 0; sheet < 24; sheet++) {
    const tiles = await Promise.all(Array.from({ length: 8 }, async (_, i) => ({
      input: await sharp(`${root}/${room}-hd/${String(sheet * 8 + i + 1).padStart(3, '0')}.webp`).resize(800, 450).toBuffer(),
      left: i % 4 * 800, top: Math.floor(i / 4) * 450
    })));
    const file = `${output}/${String(sheet).padStart(2, '0')}.webp`;
    await sharp({ create: { width: 3200, height: 900, channels: 3, background: '#171614' } }).composite(tiles).webp({ quality: 78, effort: 5 }).toFile(file);
    bytes += (await stat(file)).size;
  }
  console.log(`${room}: 24 sheets, 192 frames`);
}
await sharp(`${root}/kitchen-hd/001.webp`).resize(800, 450).webp({ quality: 84 }).toFile(`${root}/mobile-frames-v1/poster.webp`);
console.log(`Total: ${(bytes / 1024 / 1024).toFixed(2)} MiB, 120 requests instead of 960`);
