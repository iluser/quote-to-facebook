const fetchQuote = require('./fetchQuote');
const generateHtml = require('./generateHtml');
const generateImage = require('./generateImage');
const postToFacebook = require('./posttofacebook');

const runApp = async () => {
  try {
    const quote = await fetchQuote();
    const imagePath = await generateImage(quote);
    console.log('Image path:', imagePath);
    await postToFacebook(imagePath, quote);
    console.log('Process completed successfully!');
  } catch (error) {
    console.error('Error in runApp:', error);
  }
};

runApp();
module.exports = {runApp};