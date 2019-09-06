const Watcher = require('rss-watcher');
const request = require('tiny-json-http');
const slackify = require('slackify-html');
const semver = require("semver")
let cacheVersions;
function ucFirst(str) {
  return str.charAt(0).toUpperCase() + str.substring(1);
}
function getcacheVersions(coinVer) {
  if (cacheVersions) return cacheVersions;
  cacheVersions = coinVer();
  return cacheVersions
}
exports.start = (config, coinVer) => {
  const versions = getcacheVersions(coinVer);
  const watcher = new Watcher(config.feed);
  watcher.set({
    feed: config.feed,
    interval: config.interval
  });

  watcher.on("new article", article => {
    let version = article['atom:id']['#'].split('/').pop().replace(/[a-z: ]/ig, '').replace(/\(.+\)/g, "");
    if(config.name == 'dash') {
      version= version.replace(/^0\./,'');
    }
    let outdated = false;

    if (versions[config.symbol] && semver.lt(versions[config.symbol], version)) {
      outdated = true;
    }
    return request.post({
      url: config.slackHook,
      data: {
        "username": `${ucFirst(config.name)} Releases - ${versions[config.symbol]}`,
        "icon_url": config.slackIcon,
        "attachments": [{
          "color": outdated ? 'danger' : 'good',
          "pretext": `${outdated?"<!channel>":""} *New release:* <${article.link}|${article.title}>${outdated ? " *UPDATE NEEDED* " : " *Updated*"}`,
          "text": `${slackify(`${article.description.slice(0, 28)}... `)}<${article.link} | Read More >`,
          "mrkdwn_in": ["pretext", "text"],
          "footer": "Published",
          "footer_icon": "https://www.bitsler.com/img/currencies/btslr.png",
          "ts": new Date(article.pubDate).getTime() / 1000
        }]
      }
    });
  });
  return watcher.run((error, articles) => console.log('Subscribing to', ucFirst(config.name), 'releases'));
};