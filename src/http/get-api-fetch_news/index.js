const data = require('@begin/data');
const parser = require('../helpers/parser');
const table = 'news';

async function saveNewsFromSources() {
  const newsSources = [
    {
      feedUrl: 'http://rss.cnn.com/rss/edition.rss',
      source: 'CNN'
    },
    {
      feedUrl: 'https://abcnews.go.com/abcnews/topstories',
      source: 'ABC News'
    }
  ]
  let totalStoriesSaved = 0;

  for (newsSource of newsSources) {
    const stories = await parser.getStories(newsSource.feedUrl, newsSource.source);
    const savedCount = await saveNews(stories);
    console.log(`Saved ${savedCount} stories from ${newsSource.source}`);
    totalStoriesSaved += savedCount;
  }

  return totalStoriesSaved;
}

async function saveNews(stories) {
  const storiesToInsert = [];
  const ttl = (Date.now() / 1000) + (60 * 60 * 6); // 6 hours from now in seconds

  for(story of stories) {
    const key = story.url.slice(-50);
    const newsExists = await data.get({table, key});
    if (!newsExists) {
      storiesToInsert.push({table, key, ttl, story});
    }
  }

  if (storiesToInsert.length) {
    await data.set(storiesToInsert);
  }

  return storiesToInsert.length;
}

exports.handler = async function http(req) {
  try {
    const noOfStoriesSaved = await saveNewsFromSources();
    return {
      statusCode: 200,
      headers: {
        'content-type': 'application/json; charset=utf8'
      },
      body: JSON.stringify({message: `${noOfStoriesSaved} News stories fetched and saved!`})
    }
  } catch(e) {
    console.log(`e: ${e.message}`, e);
    return {
      statusCode: 500,
      headers: {
        'content-type': 'application/json; charset=utf8',
      },
      body: JSON.stringify({'message': `some error occured while fetching news, ${e.message}`})
    }
  }
}
