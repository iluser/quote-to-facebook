const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');

let n = 0;

const generateImage = async (quote) => {
  const width = 1080;
  const height = 1080;
  const backgroundColor = '#e5cbba';
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Set background color
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, width, height);

  // Set text properties
  ctx.fillStyle = '#000000';
  ctx.font = '40px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Wrap text to fit the canvas
  const lines = wrapText(ctx, quote, width - 100);
  const lineHeight = 50;
  const textHeight = lines.length * lineHeight;

  // Draw text
  lines.forEach((line, index) => {
    ctx.fillText(line, width / 2, (height - textHeight) / 2 + index * lineHeight);
  });

  // Save to file
  const buffer = canvas.toBuffer('image/png');
  const filePath = path.join(__dirname, `quote_${n}.png`);
  fs.writeFileSync(filePath, buffer);
  console.log(`Image file generated at ${filePath}`);
  n++;

  // Return file path
  return filePath;
};

const wrapText = (ctx, text, maxWidth) => {
  const words = text.split(' ');
  const lines = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const width = ctx.measureText(currentLine + ' ' + word).width;
    if (width < maxWidth) {
      currentLine += ' ' + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  lines.push(currentLine);
  return lines;
};

module.exports = generateImage;
