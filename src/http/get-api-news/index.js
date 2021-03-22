const data = require('@begin/data');

function pick(obj, attributes = []) {
  return Object.entries(obj)
    .filter(([key]) => attributes.includes(key))
    .reduce((obj, [key, val]) => Object.assign(obj, { [key]: val }), {});
}

exports.handler = async function http (req) {
  const newsStrories = await data.get({table:'news', limit: 20});
  let storiesToShow = [];

  for (newsStory of newsStrories) {
    storiesToShow.push(pick(newsStory, ['headline', 'url', 'published_date', 'source']));
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
