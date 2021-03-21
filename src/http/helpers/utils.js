const MAX_STORIES = 10;

function formatFeedStories(stories, source) {
  let formattedStories = [];
  let count = 0;
  for (story of stories) {
    formattedStories.push({ 
      headline: story.title.trim(), 
      url: story.link,
      published_date: story.pubDate,
      source });
    if (count === MAX_STORIES - 1) {
      break;
    }
    count++;
  }

  console.log(`Formatted ${formattedStories.length} storied from ${source}`, formattedStories);
  return formattedStories;
}

function omit(obj, attributes = []) {
  return Object.entries(obj)
    .filter(([key]) => !attributes.includes(key))
    .reduce((obj, [key, val]) => Object.assign(obj, { [key]: val }), {});
}

module.exports = {
  formatFeedStories,
  omit
};
