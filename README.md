# Evola Bot

https://twitter.com/evolabot

## Installing and Running

`git clone https://github.com/torchhound/evolaBot`

`npm install`

If you use a cron job `node index.js` will suffice otherwise uncomment `//timedTweet()` at the end of `index.js`

## Testing

`npm test`

## TODO

- Clean up corpus
	- Remove page headers and footers
	- Remove page numbers
	- Remove urls
	- Removing footnotes would be nice but difficult
- Handle `tweet()` false
- Optimize buildCorpus?
- Adjust Markov options
- Publish to npm