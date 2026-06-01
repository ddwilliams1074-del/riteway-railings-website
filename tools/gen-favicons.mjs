import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import { readFile, writeFile } from 'node:fs/promises';

const svg = await readFile('favicon.svg');
const sizes = {
  'favicon-16.png': 16,
  'favicon-32.png': 32,
  'apple-touch-icon.png': 180,
  'icon-192.png': 192,
  'icon-512.png': 512,
};

for (const [name, size] of Object.entries(sizes)) {
  await sharp(svg, { density: 384 }).resize(size, size).png().toFile(name);
  console.log('wrote', name);
}

// Build multi-resolution .ico from 16/32/48
const icoBufs = await Promise.all(
  [16, 32, 48].map((s) => sharp(svg, { density: 384 }).resize(s, s).png().toBuffer())
);
await writeFile('favicon.ico', await pngToIco(icoBufs));
console.log('wrote favicon.ico');
