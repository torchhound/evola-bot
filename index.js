const Markov = require('markov');
const fs = require('fs');
var Twitter = require('twitter');
var config = require('./config');

var exports = module.exports = {};

var client = new Twitter({
  consumer_key: config.twitter.consumer_key,
  consumer_secret: config.twitter.consumer_secret,
  access_token_key: config.twitter.access_token_key,
  access_token_secret: config.twitter.access_token_secret
});

const evolaTxt = fs.createReadStream('./data_acquisition/evolaArch.txt', 'utf8'); 
const data = [{'string':evolaTxt}];
const twelveHours = 43200000;
const markov = new Markov(); //TODO(torchhound) specify order?

exports.payload = function() {
	console.log("start payload");
	markov.seed(evolaTxt, function() {
		console.log("after seed");
		const result = markov.respond();
		console.log("after respond");
		console.log("markov.respond: "+result);
		return result;
	}); 
	return false;
};

//Sends a markov generated tweet
exports.tweet = function() {
	var payload = exports.payload();
	if(payload === false) {
		return false;
	};
	client.post('statuses/update', {status: payload},  function(error, tweet, response) {
  		if(error) {
  			console.log(error);
  			return false;
  		};
  		console.log(tweet);  
  		console.log(response);
  		return true;
	});
	return false;
};

//Activates tweet() every 12 hours, listens for "tweet" on stdin and activates tweet() on command
function timedTweet() {
	setInterval(function() {
  		exports.tweet(); //TODO(torchhound) on false?
	}, twelveHours);
	process.stdin.resume();
	process.stdin.setEncoding('utf8');
 
	process.stdin.on('data', function (input) { //TODO(torchhound) test this
 		if(input == "tweet") {
 			exports.tweet(); //TODO(torchhound) on false?
 		};
	});
};

//timedTweet();
exports.payload();