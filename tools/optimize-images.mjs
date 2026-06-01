import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const SRC = 'Brand Assets/site-photos';
const OUT = 'images';

const map = [
  ['img_1924.jpg', 'aluminum-glass-privacy-railing-balcony-edmonton.jpg'],
  ['site_ident.jpg', 'glass-aluminum-railing-installation-edmonton.jpg'],
  ['img_0129.jpg', 'black-aluminum-picket-railing-steps-edmonton.jpg'],
  ['img_1697.png', 'white-aluminum-deck-railing-edmonton.jpg'],
  ['img_1503.jpg', 'custom-aluminum-railing-edmonton-1.jpg'],
  ['img_1695.jpg', 'custom-aluminum-railing-edmonton-2.jpg'],
  ['img_2003.png', 'aluminum-glass-railing-deck-edmonton.jpg'],
  ['w953-h715-no.jpg', 'aluminum-railing-project-edmonton-3.jpg'],
  ['img_0130.jpg', 'aluminum-stair-railing-edmonton.jpg'],
  ['img_0594.jpg', 'aluminum-railing-installation-edmonton.jpg'],
  ['img_2291.jpg', 'custom-aluminum-railing-edmonton-4.jpg'],
];

await mkdir(OUT, { recursive: true });
for (const [src, dest] of map) {
  await sharp(`${SRC}/${src}`)
    .rotate()                              // respect EXIF orientation
    .resize({ width: 1600, withoutEnlargement: true })
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(`${OUT}/${dest}`);
  console.log('wrote', dest);
}
