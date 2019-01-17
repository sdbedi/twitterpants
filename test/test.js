const twitterpants = require("../twitterpants.js");

var assert = require("assert");
describe("twitterpants", function() {
  describe("type", function() {
    it("should be an object", function() {
      assert.equal(typeof twitterpants, "object");
    });
  });
});

describe("getTweets", function() {
  describe("typeof", function() {
    it("should be a function", function() {
      assert.equal(typeof twitterpants.getTweets, "function");
    });
  });
});

describe("throttledRequest", function() {
  describe("typeof", function() {
    it("should be a function", function() {
      assert.equal(typeof twitterpants.throttledRequest, "function");
    });
  });
});

describe("query", function() {
  describe("default", function() {
    it("should default to #iot", function() {
      assert.equal(twitterpants.query, "%23iot");
    });
  });
  describe("type", function() {
    it("should be a string", function() {
      assert.equal(typeof twitterpants.query, "string");
    });
  });
});

describe("request options", function() {
  describe("type", function() {
    it("should be an object", function() {
      assert.equal(typeof twitterpants.request_options, "object");
    });
  });
  describe("type", function() {
    it("should have a url", function() {
      assert.equal(twitterpants.request_options.hasOwnProperty("url"), true);
    });
  });
  describe("type", function() {
    it("should have authentication headers", function() {
      assert.equal(twitterpants.request_options.hasOwnProperty("oauth"), true);
    });
  });
});
