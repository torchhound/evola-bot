const Markov = require('markov-strings');
const fs = require('fs');
var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
});

const data = fs.readFileSync('/data_acquisition/evola.txt');
const options = {
	maxLength: 140,
	minWords: 10,
	minScore: 25
};

const markov = new Markov(data, options);

markov.buildCorpusSync();
const result = markov.generateSentenceSync();
console.log(result);