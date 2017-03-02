var assert = require('assert');
var index = require('../index');

describe('Payload', function() {
  describe('#payload()', function() {
    it('should return a string', function() {
      assert.equal(String, index.payload());
    });
  });
});

describe('Tweet', function() {
  describe('#tweet()', function() {
    it('should tweet a markov generated string', function() {
      assert.equal(true, index.tweet());
    });
  });
});