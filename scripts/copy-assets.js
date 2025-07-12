const fs = require('fs');
const path = require('path');

console.log('Starting asset copy process...');

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

// Copy images
console.log('Copying images...');
if (fs.existsSync('src/images')) {
  copyDirectorySync('src/images', 'dist/images');
} else {
  console.log('src/images directory not found, skipping...');
}

// Copy HTML
console.log('Copying HTML...');
if (fs.existsSync('src/index.html')) {
  copyFileSync('src/index.html', 'dist/index.html');
} else {
  console.log('src/index.html not found, skipping...');
}

console.log('Asset copying completed successfully!');