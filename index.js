const Markov = require('markov-strings');
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

const evolaTxt = fs.readFileSync('./data_acquisition/evolaArch.txt', 'utf8');
const data = [{'string':evolaTxt}];
const options = {
	maxLength: 140,
	minWords: 10,
	minScore: 20
};
const twelveHours = 43200000;
const markov = new Markov(data, options);

exports.payload = function() {
	markov.buildCorpusSync();
	const result = markov.generateSentenceSync();
	return result; //result.string?
};

//Sends a markov generated tweet
exports.tweet = function() {
	var payload = exports.payload();
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
  		exports.tweet();
	}, twelveHours);
	process.stdin.resume();
	process.stdin.setEncoding('utf8');
 
	process.stdin.on('data', function (input) {
 		if(input == "tweet") {
 			exports.tweet();
 		};
	});
};

timedTweet();