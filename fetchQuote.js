const axios = require('axios');
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio')

const quotesFilePath = path.join(__dirname, 'quotes.json');

function getRandomText(id) {
  var raNdText = id[Math.floor(Math.random() * id.length)];
  return raNdText;
}

function quote(input) {
  return new Promise((resolve, reject) => {
      fetch('https://jagokata.com/kata-bijak/kata-' + input.replace(/\s/g, '_') + '.html?page=1')
          .then(res => res.text())
          .then(res => {
              const $ = cheerio.load(res)
              let data = []
              $('div[id="main"]').find('ul[id="citatenrijen"] > li').each(function (index, element) {
                  let x = $(this).find('div[class="citatenlijst-auteur"] > a').text().trim()
                  let y = $(this).find('span[class="auteur-beschrijving"]').text().trim()
                  let z = $(element).find('q[class="fbquote"]').text().trim()
                  data.push({ author: x, bio: y, quote: z })
              })
              data.splice(2, 1)
              if (data.length == 0) return resolve({ status: false })
              resolve({ status: true, data })
          }).catch(reject)
  })
}

const fetchQuote = async () => {
  try {
    const previousQuotes = JSON.parse(fs.readFileSync(quotesFilePath, 'utf8'));
    const a = ['mantan', 'hidup', 'senja', 'cinta', 'gunung', 'pantai', 'rindu'];
    const random = getRandomText(a);
    const result = await quote(random);
    
    if (result.status && result.data.length > 0) {
      const randomIndex = Math.floor(Math.random() * result.data.length);
      const potentialQuote = await result.data[randomIndex];
      
      if (!previousQuotes.includes(potentialQuote.quote)) {
        // Simpan quote baru ke file
        await previousQuotes.push(potentialQuote.quote);
        fs.writeFileSync(quotesFilePath, JSON.stringify(previousQuotes, null, 2), 'utf8');
        return potentialQuote.quote;
      }
    }

    // throw new Error('Failed to get unique quote');
  } catch (error) {
    console.error('Error fetching quote:', error);
    return 'Semoga segala hal yang kita jalani kini. Seberat apa pun usaha menjaga hati. Tidak hanya menjadi lelah yang tak berarti.';
  }
};

module.exports = fetchQuote;
