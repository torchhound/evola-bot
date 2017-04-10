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

const data = [];
const evolaTxt = fs.readFileSync('./data_acquisition/evolaArch.txt', 'utf8'); 
const corpus = evolaTxt.toString().split(".");
for(var i = 0; i < (corpus.length-1); i++) { //TODO(torchhound) further corpus cleaning?
  corpus[i] = corpus[i].toString().replace(/[^a-z0-9]/gmi, " ").replace(/\s+/g, " ");
  data.push(corpus[i]);
};
const options = { //TODO(torchhound) adjust options
	maxLength: 140,
	minScore: 25,
};
const threeHours = 10800000;
const markov = new Markov(data, options);

exports.payload = function() {
	console.log("start payload");
	markov.buildCorpusSync(); //TODO(torchhound) buildCorpus once at program launch or every time the function is called?
	console.log("after buildCorpus");
	const result = markov.generateSentenceSync();
	console.log("after generateSentence");
	console.log("result.string: "+result.string);
	return result.string;
};

//Sends a markov generated tweet
exports.tweet = function() {
	var payload = exports.payload();
	client.post('statuses/update', {status: payload},  function(error, tweet, response) {
  		if(error) {
  			console.log(error);
  			return false;
  		};
  		console.log("tweet: "+JSON.stringify(tweet));  
  		console.log("response: "+JSON.stringify(response));
  		return true;
	});
	return false;
};

//Activates tweet() every 12 hours, listens for "tweet" on stdin and activates tweet() on command
function timedTweet() { 
	exports.tweet();
	setInterval(function() {
  		exports.tweet(); //TODO(torchhound) on false?
	}, threeHours);/*
	process.stdin.resume();
	process.stdin.setEncoding('utf8');
 
	process.stdin.on('data', function (input) { //TODO(torchhound) test this
 		if(input == "tweet") {
 			exports.tweet(); //TODO(torchhound) on false?
 		};
	});*/
};

//Uncomment this if you are not using a cron job
//timedTweet(); 
exports.tweet();