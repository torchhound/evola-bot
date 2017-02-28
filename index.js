const Markov = require('markov-strings');
const fs = require('fs');
var Twitter = require('twitter');
var config = require('./config');

var client = new Twitter({
  consumer_key: config.twitter.consumer_key,
  consumer_secret: config.twitter.consumer_secret,
  access_token_key: config.twitter.access_token_key,
  access_token_secret: config.twitter.access_token_secret
});

const data = fs.readFileSync('/data_acquisition/evola.txt');
const options = {
	maxLength: 140,
	minWords: 10,
	minScore: 25
};
const twelveHours = 43200000;
const markov = new Markov(data, options);

//Sends a markov generated tweet
function tweet() {
	markov.buildCorpusSync();
	const result = markov.generateSentenceSync();
	client.post('statuses/update', {status: result},  function(error, tweet, response) {
  		if(error) throw error;
  		console.log(tweet);  
  		console.log(response);  
	});
};

//Activates tweet() every 12 hours, listens for "tweet" on stdin and activates tweet() on command
function timedTweet() {
	setInterval(function() {
  		tweet();
	}, twelveHours);
	process.stdin.resume();
	process.stdin.setEncoding('utf8');
 
	process.stdin.on('data', function (input) {
 		if(input == "tweet") {
 			tweet();
 		};
	});
};

timedTweet();