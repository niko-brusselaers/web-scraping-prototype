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
  // TODO:webscrape data from website
  try {
    const { url } = request.body;
    const htmlData = await axios.get(url)
    .then((res) => res.data)
    .then((data) => {
      const pageData = handleHTML(data, 
        { selector: '.product-tile', 
          childselector:[
            { selector: '.pdp-link:first'},
            { selector: '.product-tile__price:first'},
            { selector: '.tile-image-slider picture source:first', attribute: 'srcset'},
            { selector: '.pdp-link a:first', attribute: 'href'}],
          variablesNames: ['name', 'price', 'image', 'url']
        })
      // console.log(pageData);

      
      // response.send(pageData);

      // const $ = load(data);
      // const products = []
      //  $('.product-tile').each((i, el) => {
      //   let productName = $(el).find('.pdp-link:first').text().trim().replace(/\n/g, '');
      //   let productPrice = $(el).find('.product-tile__price:first').text().trim().replace(/\n/g, '');
      //   let productImage = $(el).find('.tile-image-slider picture source:first').attr('srcset')
      //    if (!productImage) productImage =  $(el).find('.tile-image-slider picture source').attr('data-srcset');
      //    productImage = productImage.split(' ')[0]
      //   let productUrl = $(el).find('.pdp-link a:first').attr('href');
      //       console.log(typeof productImage);
      //    products.push({
      //      name: productName,
      //      price: productPrice,
      //      image: productImage,
      //      url: productUrl
      //    });
      // });

      //send response to client
      // response.send(products);
    })

    
  } catch (error) {
    //write error in console 
    console.log(error);
    //send error response to client
    response.statusCode = 400;
    response.send(error)
  }

});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});