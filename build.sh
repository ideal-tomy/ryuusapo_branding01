#!/bin/bash

# Create dist directory if it doesn't exist
mkdir -p dist
mkdir -p dist/css
mkdir -p dist/js
mkdir -p dist/images

# Build CSS
echo "Building CSS..."
npx sass src/scss/main.scss dist/css/main.css --style compressed
npx postcss dist/css/main.css --use autoprefixer -r

# Build JS
echo "Building JavaScript..."
npx terser src/js/main.js -o dist/js/main.js --compress --mangle

# Copy assets
echo "Copying assets..."
cp -r src/images/* dist/images/ 2>/dev/null || true
cp src/index.html dist/index.html

echo "Build completed successfully!" 