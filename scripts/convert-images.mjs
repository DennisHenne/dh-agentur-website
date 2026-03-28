import sharp from 'sharp';
import { readdirSync, statSync } from 'fs';
import { join, extname, basename } from 'path';

const publicDir = 'C:\\Users\\user\\Desktop\\DH Agentur Website\\public';

const images = readdirSync(publicDir).filter(f => {
  const ext = extname(f).toLowerCase();
  return ['.jpg', '.jpeg', '.png'].includes(ext);
});

console.log(`Converting ${images.length} images to WebP...`);

let saved = 0;
let totalOriginal = 0;
let totalWebp = 0;

for (const file of images) {
  const inputPath = join(publicDir, file);
  const outputName = basename(file, extname(file)) + '.webp';
  const outputPath = join(publicDir, outputName);

  try {
    const originalSize = statSync(inputPath).size;
    await sharp(inputPath)
      .webp({ quality: 82, effort: 5 })
      .toFile(outputPath);
    const webpSize = statSync(outputPath).size;
    const reduction = (((originalSize - webpSize) / originalSize) * 100).toFixed(1);
    totalOriginal += originalSize;
    totalWebp += webpSize;
    saved++;
    console.log(`  ✓ ${file} → ${outputName}  (${(originalSize/1024).toFixed(0)}KB → ${(webpSize/1024).toFixed(0)}KB, -${reduction}%)`);
  } catch (err) {
    console.error(`  ✗ ${file}: ${err.message}`);
  }
}

const totalReduction = (((totalOriginal - totalWebp) / totalOriginal) * 100).toFixed(1);
console.log(`\nDone! Converted ${saved}/${images.length} images.`);
console.log(`Total: ${(totalOriginal/1024/1024).toFixed(2)}MB → ${(totalWebp/1024/1024).toFixed(2)}MB (-${totalReduction}%)`);
