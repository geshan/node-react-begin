import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

const App = () => {
  const [message, setMessage] = useState('...loading');
  const [stories, setStories] = useState({});

  useEffect(() => {
    async function fetchData () {
      try {
        let data = await (await fetch('/api/news')).json()
        setMessage(data[0].headline)
        setStories(data);
      } catch (err) {
        setMessage(err.message)
      }
    }
    fetchData()
  })

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Latest News</h2>
        <p>{message}</p>
        {stories.map(story => <h3>{story.headline}</h3>)}
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
