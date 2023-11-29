import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const port = 4000 ;
const app = express();
app.use(cors());

app.get('/', async (request, response) => {
  response.send('Hello World');
});

app.post('/getPageData', async (request, response) => {
  // TODO:webscrape data from website
});

app.listen(3000, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});