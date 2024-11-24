const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

async function getChatGptResponse(quote) {
    try {
        const url = 'https://api.chatanywhere.tech/v1/chat/completions'
        const headers = {
            Authorization: `sk-AHyVVBgvN6CXtIzobePPCuUc2yeTYoItnaVxZjMasrSckLiQ`,
            'Content-Type': 'application/json'
        }
        const data = {
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'Asisten Handal' },
                { role: 'user', content: `Buat cerita puitis yang mudah dimengerti oleh orang usia 20 tahunan tentang kata-kata ini: ${quote}` }
            ]
        }
        
        const response = await axios.post(url, data, { headers: headers })
        return response.data
        
    } catch (error) {
        console.error('Error in getChatGptResponse:', error)
        throw error
    }
}

const postToFacebook = async (imagePath, quote) => {
  try {
    // Read access token from token.txt
    const accessToken = fs.readFileSync('token.txt', 'utf8').trim();
    const pageId = 'indoebuku';
    
    // Gunakan quote yang diterima dari parameter
    const chatGptResult = await getChatGptResponse(quote);
    const message = `${chatGptResult.choices[0].message.content}\n.\n.\n#kata #fbpro #fyp #katamutiara #katakehidupan`;
    
    const formData = new FormData();
    formData.append('source', fs.createReadStream(imagePath));
    formData.append('message', message);

    const response = await axios({
      method: 'post',
      url: `https://graph.facebook.com/v18.0/${pageId}/photos`,
      params: {
        access_token: accessToken
      },
      data: formData,
      headers: {
        ...formData.getHeaders(),
        'Content-Type': 'multipart/form-data'
      }
    });

    console.log('Successfully posted to Facebook:', response.data);
    return response.data;

  } catch (error) {
    console.error('Error posting to Facebook:', error.response?.data || error.message);
    throw error;
  }
};

module.exports = postToFacebook;
