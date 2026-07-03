import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const imagesToOptimize = [
  { src: 'public/Images/booth exib.png', dest: 'public/Images/booth_exib.webp' },
  { src: 'public/Images/Products/08d07495-ea3a-4a50-8291-b81c2c99f4a9.png', dest: 'public/Images/Products/08d07495-ea3a-4a50-8291-b81c2c99f4a9.webp' },
  { src: 'public/Images/Products/0a2f66b6-afd9-48b8-a972-f34cfae38112.png', dest: 'public/Images/Products/0a2f66b6-afd9-48b8-a972-f34cfae38112.webp' },
  { src: 'public/Images/Products/3b41b48b-793d-4b06-b872-8a701ecd05d0.png', dest: 'public/Images/Products/3b41b48b-793d-4b06-b872-8a701ecd05d0.webp' },
  { src: 'public/Images/Products/59aaf0c2-686f-423e-bda7-744a9f720398.png', dest: 'public/Images/Products/59aaf0c2-686f-423e-bda7-744a9f720398.webp' },
  { src: 'public/Images/Products/61b16c79-0f71-4ee6-87c5-396b8123796c.png', dest: 'public/Images/Products/61b16c79-0f71-4ee6-87c5-396b8123796c.webp' },
  { src: 'public/Images/Products/6426e120-3100-4f18-a55f-3ea2fb96390d.png', dest: 'public/Images/Products/6426e120-3100-4f18-a55f-3ea2fb96390d.webp' },
  { src: 'public/Images/Project/57045811-01db-4a79-8406-f8398676e32e.png', dest: 'public/Images/Project/57045811-01db-4a79-8406-f8398676e32e.webp' },
  { src: 'public/Images/Project/639f0a0f-0c98-486e-9e26-484e33c05784.png', dest: 'public/Images/Project/639f0a0f-0c98-486e-9e26-484e33c05784.webp' },
  // Generated showcase images from artifact folder
  { src: '/Users/mac/.gemini/antigravity-ide/brain/2d4e047f-df7f-4df3-a5ee-9bd6eecad893/scada_showcase_1782828791181.png', dest: 'public/Images/Project/scada_showcase.webp' },
  { src: '/Users/mac/.gemini/antigravity-ide/brain/2d4e047f-df7f-4df3-a5ee-9bd6eecad893/mcc_showcase_1782828810790.png', dest: 'public/Images/Project/mcc_showcase.webp' },
  { src: '/Users/mac/.gemini/antigravity-ide/brain/2d4e047f-df7f-4df3-a5ee-9bd6eecad893/lighting_showcase_1782828832602.png', dest: 'public/Images/Project/lighting_showcase.webp' }
];

async function run() {
  console.log('Starting image optimization...');
  let totalSaved = 0;
  for (const item of imagesToOptimize) {
    const srcPath = path.resolve(item.src);
    const destPath = path.resolve(item.dest);
    
    if (fs.existsSync(srcPath)) {
      console.log(`Optimizing ${item.src} -> ${item.dest}`);
      await sharp(srcPath)
        .webp({ quality: 80 })
        .toFile(destPath);
      
      const oldSize = fs.statSync(srcPath).size;
      const newSize = fs.statSync(destPath).size;
      const saved = oldSize - newSize;
      totalSaved += saved;
      console.log(`Reduced size by ${((saved) / oldSize * 100).toFixed(2)}% (${(oldSize/1024/1024).toFixed(2)}MB -> ${(newSize/1024).toFixed(2)}KB)`);
    } else {
      console.warn(`File not found: ${item.src}`);
    }
  }
  console.log(`Image optimization complete! Total space saved: ${(totalSaved/1024/1024).toFixed(2)} MB`);
}

run().catch(console.error);
