require('dotenv').config();
const rss = require("./src/rss");
const {currencies, coinVersions} = require('./config');

currencies.forEach(function(repo) {

	rss.start({
		feed: repo.url + "/releases.atom",
		interval: repo.interval ,
		slackHook: repo.webhookUrl ,
		slackIcon: repo.icon,
    symbol: repo.symbol,
		name: repo.name
	,},coinVersions);
});