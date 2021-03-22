import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

const App = () => {
  const [stories, setStories] = useState([]);
  const [message, setMessage] = useState('loading...');
  useEffect(() => {
    async function fetchNewsStories () {
      try {
        await (await fetch('/api/fetch-news')).json();
        const data = await (await fetch('/api/news')).json();
        setStories(data)
        setMessage('');
      } catch (err) {
        console.log(`err: ${err.mesasge}`, err);
      }
    }
    fetchNewsStories()
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Latest News</h2>
        {message}
        <div className="stories">
          {stories.map(story => <h3><a href={story.url} target="_blank" rel="noreferrer">{story.headline}</a> By - {story.source}</h3>)}
        </div>
      </header>
    </div>
  );
}

export default App;
