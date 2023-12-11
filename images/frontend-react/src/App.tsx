import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:4000'

function App() {
  const [webDomain, setWebDomain] = useState<string>('torfs.be')
  const [webURL, setWebURL] = useState<string>('')
  const [scrapedData, setScrapedData] = useState<[]>([])

  const handleForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios.post(`${API_URL}/getPageData`, {
      websiteDomain: webDomain,
      url: webURL,
    })
    .then((response) => {
      console.log(response.data.data);
      setScrapedData(response.data.data);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
  }

  return (
    <div className="App">
      <form onSubmit={handleForm}>
        <div>
        <label htmlFor="webDomain">please select web domain to scrap</label>
        <select name="webDomain" id="Webdomain" onChange={(event) => {setWebDomain(event.currentTarget.value)}}>
          <option value="torfs.be">torfs.be</option>
          <option value="bol.com">bol.com</option>
          <option value="gamma.be">gamma.be</option>
          <option value="dreamland.be">dreamland.be</option>
        </select>
        </div>
        <div>
        <label htmlFor="webURL">please enter url to scrape</label>
        <input type="text" name="webURL" id="webURL" onChange={(event)=> {setWebURL(event.currentTarget.value)}}/>
        </div>
        
        <div>
          <button type="submit">submit</button>
          </div>
      </form>
      <div className='productList'>
        {scrapedData ? scrapedData.map((data: any, index: number) => {
          return(
            <div className='productItem' key={index}>
              {data.image ? <img src={data.image} alt={data.title}/>: null} 
              <div>
                {data.name ? <h2>{data.name}</h2> : null}
                {data.price ? <p>{data.price}</p>: null}
                {data.url ? <a href={data.url}>product page</a> : null}
              </div>
            </div>
          )
        }) : null}
      </div>
    </div>
  );
}

export default App;
