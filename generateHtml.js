const fs = require('fs');
const path = require('path');

const generateHtml = (quote) => {
  const htmlContent = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sad Quote</title>
    <style>
      body {
        background-color: #e5cbba;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
        font-family: Arial, sans-serif;
      }
      .quote {
        font-size: 1.5em;
        text-align: center;
        padding: 20px;
        border: 2px solid #000;
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.8);
      }
    </style>
  </head>
  <body>
    <div class="quote">${quote}</div>
  </body>
  </html>
  `;

  const filePath = path.join(__dirname, 'quote.html');
  console.log(`HTML file generated at ${filePath}`);
  return fs.writeFileSync(filePath, htmlContent, 'utf8');
};

module.exports = generateHtml;
