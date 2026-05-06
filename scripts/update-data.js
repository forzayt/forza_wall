import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.resolve(__dirname, '../public/data');
const outputFile = path.resolve(__dirname, '../public/data.json');

console.log('Scanning directory:', dataDir);

try {
  if (fs.existsSync(dataDir)) {
    const files = fs.readdirSync(dataDir).map(file => ({
      name: file,
      url: `data/${encodeURIComponent(file)}`
    }));
    
    fs.writeFileSync(outputFile, JSON.stringify(files, null, 2));
    console.log(`Successfully generated ${outputFile} with ${files.length} files.`);
  } else {
    fs.writeFileSync(outputFile, JSON.stringify([]));
    console.log(`Data directory not found. Generated empty ${outputFile}.`);
  }
} catch (error) {
  console.error('Failed to generate data.json:', error);
  process.exit(1);
}
