var Twit = require('twit');
var T = new Twit(require('./config.js'));

var mediaArtsSearch = {q: "#webdesign", count: 10, result_type: "recent"}; 

function retweetLatest() {
	T.get('search/tweets', mediaArtsSearch, function (error, data) {
	  console.log(error, data);
	  if (!error) {
		var retweetId = data.statuses[0].id_str;
		T.post('statuses/retweet/' + retweetId, { }, function (error, response) {
			if (response) {
				console.log('+1 retweet.')
			}
			if (error) {
				console.log('Problème de connexion : ', error);
			}
		})
	  }
	  else {
	  	console.log('Problème de hashtag :', error);
	  }
	});
}

retweetLatest();
// 5min refresh
setInterval(retweetLatest, 5 * 60 * 1000);
