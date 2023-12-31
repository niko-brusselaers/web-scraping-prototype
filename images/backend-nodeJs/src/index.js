import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import { load,text } from 'cheerio';
import handleHTML from './utils/handleHtml.js';

dotenv.config(); 

const port = 4000 ;
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.get('/', async (request, response) => {
  response.send('Hello World');
});

app.post('/getPageData', async (request, response) => {
  try {
    const { url, websiteDomain } = request.body;

    //check if url and websiteDomain are provided
    if (!url) throw new Error('url is required');
    if (!websiteDomain) throw new Error('websiteDomain is required');


    let dataToExtract = {};

    //set selectors and variable names based on website domain name
    switch (websiteDomain) {
      case "torfs.be":
      case "torfs":
        dataToExtract = {
          domainName: 'torfs.be',
          selector: '.product-tile',
          childselector: [
            { selector: '.pdp-link:first' },
            { selector: '.product-tile__price:first' },
            { selector: '.tile-image-slider picture source:first', attribute: 'srcset' },
            { selector: '.pdp-link a:first', attribute: 'href' }],
          variablesNames: ['name', 'price', 'image', 'url']
        }
        break;

      // case "coolblue.be":
      // case "coolblue.nl":
      // case "coolblue":
      //   dataToExtract = {
      //     domainName: 'coolblue.be',
      //     selector: '.product-card',
      //     childselector: [
      //       { selector: '.product-card__title a' },
      //       { selector: '.product-card__brand-logo', attribute: 'alt' },
      //       { selector: '.sales-price__current' },
      //       { selector: '.picture__image', attribute: 'srcset' },
      //     ],
      //     variablesNames: ['name', 'brand', 'price', 'image']
      //   }
      //   break;

      case "bol.com":
      case "bol":
        dataToExtract = {
          domainName: 'bol.com',
          selector: '.product-item--row',
          childselector: [
            { selector: '.product-title' },
            { selector: '.promo-price' },
            { selector: '.product-item__image img', attribute: 'src' },
            { selector: '.product-title', attribute: 'href' }
          ],
          variablesNames: ['name', 'price', 'image', 'url']
        }
        break;

      case "dreamland.be":
      case "dreamland":
        dataToExtract = {
          domainName: 'dreamland.be',
          selector: '.product',
          childselector: [
            { selector: '.product_name' },
            { selector: '.price__main' },
            { selector: '.image img', attribute: 'src' },
          ],
          variablesNames: ['name', 'price', 'image']
        }
        break;

      case "gamma.be":
      case "gamma":
        dataToExtract = {
          domainName: 'gamma.be',
          selector: '.product-tile-container',
          childselector: [
            { selector: '.product__title' },
            { selector: '.product-tile-price-current' },
            { selector: '.product-tile-image img', attribute: 'src' },
            { selector: '.click-mask', attribute: 'href' }
          ],
          variablesNames: ['name', 'price', 'image', 'url']
        }
        break;

      default:
        //if website domain name is not supported throw error
        throw new Error('website domain name is not supported');
        break;
    }

    //get page data
    await axios.get(url)
    .then((res) => res.data)
    .then(async (data) => {

      //extract data from html with using provided selectors and store it in array with provided variable names
      const pageData = await handleHTML(data, dataToExtract)

      response.status(200).send({ data: pageData });
    })

    
  } catch (error) {
    //write error in console 
    console.log(error);
    //send error response to client
    response.status(400).send({ error: error.message });
  }

});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});