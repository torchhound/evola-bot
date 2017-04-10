var assert = require('chai').assert
var index = require('../index');

describe('Payload', function() {
  this.timeout(120000);
  describe('#payload()', function() {
    it('should return a string', function() {
      assert.typeOf(index.payload(), 'string');
    });
  });
});
/*
describe('Tweet', function() { //Error: socket hang up
  this.timeout(120000);
  describe('#tweet()', function() {
    it('should tweet a markov generated string', function() {
      assert.equal(true, index.tweet());
    });
  });
});*/