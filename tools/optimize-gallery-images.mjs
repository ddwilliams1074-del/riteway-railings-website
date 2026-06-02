import sharp from 'sharp';
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

// Optimize the dropped-in WhatsApp photos into web-friendly, SEO-named files
// for the Aluminum Railing / Glass Railing / Privacy Walls pages.
// Same recipe as tools/optimize-images.mjs: EXIF-rotate, max 1600px wide,
// mozjpeg q80. Dedupes identical files within a folder by content hash.

const jobs = [
  { srcDir: 'Brand Assets/source-photos/Aluminum Railing', outDir: 'images/aluminum-railing', slug: 'aluminum-railing-edmonton' },
  { srcDir: 'Brand Assets/source-photos/Glass Railing',    outDir: 'images/glass-railing',    slug: 'glass-railing-edmonton' },
  { srcDir: 'Brand Assets/source-photos/Privacy Walls',    outDir: 'images/privacy-walls',    slug: 'privacy-wall-edmonton' },
];

const manifest = {};

for (const { srcDir, outDir, slug } of jobs) {
  await mkdir(outDir, { recursive: true });
  const files = (await readdir(srcDir)).filter((f) => /\.(jpe?g|png)$/i.test(f)).sort();
  const seen = new Set();
  const written = [];
  let n = 0;
  for (const file of files) {
    const buf = await readFile(`${srcDir}/${file}`);
    const hash = createHash('md5').update(buf).digest('hex');
    if (seen.has(hash)) { console.log('skip dup', file); continue; }
    seen.add(hash);
    n += 1;
    const dest = `${slug}-${String(n).padStart(2, '0')}.jpg`;
    const meta = await sharp(buf).rotate().resize({ width: 1100, withoutEnlargement: true })
      .jpeg({ quality: 76, mozjpeg: true }).toFile(`${outDir}/${dest}`);
    written.push({ src: `${outDir}/${dest}`, w: meta.width, h: meta.height });
    console.log('wrote', dest, `${meta.width}x${meta.height}`);
  }
  manifest[outDir] = written;
}

await writeFile('tools/gallery-manifest.json', JSON.stringify(manifest, null, 2));
console.log('\nmanifest written to tools/gallery-manifest.json');
