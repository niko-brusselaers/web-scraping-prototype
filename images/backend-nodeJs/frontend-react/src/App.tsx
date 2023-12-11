import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:4000'

function App() {
  const [webDomain, setWebDomain] = useState<string>('torfs.be')
  const [webURL, setWebURL] = useState<string>('')

  const handleForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios.post(`${API_URL}/getPageData`, {
      websiteDomain: webDomain,
      url: webURL
    })
    .then((data) => {
      console.log(data)
    })
  }

  return (
    <div className="App">
      <form onSubmit={handleForm}>
        <label htmlFor="webDomain">please select web domain to scrap</label>
        <select name="webDomain" id="Webdomain" onChange={(event) => {setWebDomain(event.currentTarget.value)}}>
          <option value="torfs.be">torfs.be</option>
          <option value="bol.com">bol.com</option>
          <option value="gamme.be">gamma.be</option>
          <option value="dreamland.be">dreamland.be</option>
        </select>
        <label htmlFor="webURL">please enter url to scrape</label>
        <input type="text" name="webURL" id="webURL" onChange={(event)=> {setWebURL(event.currentTarget.value)}}/>
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default App;
