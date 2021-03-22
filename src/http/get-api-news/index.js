const data = require('@begin/data');


exports.handler = async function http (req) {
  const newsStrories = await data.get({table:'news', limit: 20});
  let storiesToShow = [];

  for (newsStory of newsStrories) {
    storiesToShow.push(newsStory.story);
  }

  const sortedStories = storiesToShow.sort((a, b) => new Date(b.published_date) - new Date(a.published_date))
  return {
    headers: {
      'content-type': 'application/json; charset=utf8',
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
    },
    statusCode: 200,
    body: JSON.stringify(sortedStories)
  }
}
