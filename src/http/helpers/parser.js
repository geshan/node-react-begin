const Parser = require('rss-parser');
const parser = new Parser();
const utils = require('./utils');

async function getStories(feedUrl, source) {
  try {
    const feed = await parser.parseURL(feedUrl);
    return utils.formatFeedStories(feed.items, source);
  } catch (err) {
    const errMessage = `Error while parsing feed from news stories for ${source}`;
    console.log(errMessage, err);

    return [];
  }
}

module.exports = {
  getStories,
};