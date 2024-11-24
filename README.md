# Quote Generator & Facebook Poster

An automated Node.js application that fetches quotes, generates images with the quotes, and posts them to Facebook automatically.

## Features

- 🎯 Fetches random quotes from a curated collection
- 🖼️ Generates beautiful images with quotes
- 📱 Automatically posts to Facebook with AI-generated captions
- 🤖 Uses ChatGPT to create engaging story contexts
- 🎨 Custom image generation with configurable styles

## Prerequisites

- Node.js (v14 or higher)
- Facebook Page Access Token
- ChatGPT API Key

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd sad-quote-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `token.txt` file in the root directory and add your Facebook Page Access Token:
```
<your-facebook-page-access-token>
```

## Configuration

1. Update the ChatGPT API key in `posttofacebook.js`
2. Customize image generation settings in `generateImage.js`
3. Modify quote sources in `fetchQuote.js`

## Usage

Run the application:
```bash
node .
```

The application will:
1. Fetch a random quote
2. Generate an image with the quote
3. Create an AI-generated story context
4. Post the content to Facebook

## Image Customization

You can customize the image generation by modifying:
- Background color
- Font size and family
- Canvas dimensions
- Text wrapping

## Error Handling

The application includes comprehensive error handling for:
- Failed quote fetching
- Image generation issues
- Facebook API posting errors
- ChatGPT API communication

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the LICENSE file for details.

## Acknowledgments

- Uses Canvas for image generation
- Powered by ChatGPT for content enhancement
- Facebook Graph API for social media posting
```
