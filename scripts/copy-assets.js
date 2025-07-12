const fs = require('fs');
const path = require('path');

function copyFileSync(source, target) {
  try {
    const targetDir = path.dirname(target);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    fs.copyFileSync(source, target);
    console.log(`Copied: ${source} -> ${target}`);
  } catch (error) {
    console.error(`Error copying ${source}:`, error.message);
  }
}

function copyDirectorySync(source, target) {
  try {
    if (!fs.existsSync(target)) {
      fs.mkdirSync(target, { recursive: true });
    }

    const files = fs.readdirSync(source);
    files.forEach(file => {
      const sourcePath = path.join(source, file);
      const targetPath = path.join(target, file);

      if (fs.statSync(sourcePath).isDirectory()) {
        copyDirectorySync(sourcePath, targetPath);
      } else {
        copyFileSync(sourcePath, targetPath);
      }
    });
  } catch (error) {
    console.error(`Error copying directory ${source}:`, error.message);
  }
}

// Copy images directory
const sourceImages = path.join('src', 'images');
const targetImages = path.join('dist', 'images');

if (fs.existsSync(sourceImages)) {
  console.log('Copying images...');
  copyDirectorySync(sourceImages, targetImages);
} else {
  console.log('Images directory not found, skipping...');
}

// Copy index.html
const sourceHtml = path.join('src', 'index.html');
const targetHtml = path.join('dist', 'index.html');

if (fs.existsSync(sourceHtml)) {
  console.log('Copying index.html...');
  copyFileSync(sourceHtml, targetHtml);
} else {
  console.error('index.html not found!');
  process.exit(1);
}

console.log('Asset copying completed successfully!');