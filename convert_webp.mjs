import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const srcDir = path.resolve('public/photos');
const outputDir = path.resolve('public/photos');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.png'));

console.log(`Found ${files.length} images to convert to WebP...`);

for (const file of files) {
  const filePath = path.join(srcDir, file);
  const baseName = path.parse(file).name;
  const targetPath = path.join(outputDir, `${baseName}.webp`);

  try {
    await sharp(filePath)
      .resize({ width: 1000, height: 1000, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 82, effort: 4 })
      .toFile(targetPath);
    
    const origSize = (fs.statSync(filePath).size / 1024).toFixed(1);
    const newSize = (fs.statSync(targetPath).size / 1024).toFixed(1);
    console.log(`Converted ${file} (${origSize} KB) -> ${baseName}.webp (${newSize} KB)`);
  } catch (err) {
    console.error(`Error converting ${file}:`, err);
  }
}

console.log('Conversion to WebP complete!');
