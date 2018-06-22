//Demonstrates making a GET request to Twitter Search.
const request = require("request"); //time permitting, switch to a promise - based library, ie Axios
const throttledRequest = require('throttled-request')(request);
throttledRequest.configure({
  requests: 5,
  milliseconds: 1000
});//This will throttle the requests so no more than 5 are made every second; time permitting, switch to a promise - based library, ie Axios

const fs = require("fs");
const util = require('util');
const writeCSV = util.promisify(fs.writeFile); //we can promisify node's built in fs functions
const appendCSV = util.promisify(fs.appendFile);

//Twitter OAuth Credentials
const search_auth = {
  consumer_key: 'XXXXXXXXXXXXXXXX',
  consumer_secret: 'XXXXXXXXXXXXXXXX',
  token: 'XXXXXXXXXXXXXXXX',
  token_secret: 'XXXXXXXXXXXXXXXX'
}

let query = process.argv.slice(2).join(" ") || "%23iot"; // #iot is default, but will take command line args and attempt to construct a query from that

// request options
const request_options = {
  //GET form with query included in URL.
  url: 'https://api.twitter.com/1.1/tweets/search/30day/Dev.json'+ '?query=' + query,
  oauth: search_auth,
  json: true,
  headers: {
    'content-type': 'application/json'
  }
}

//This function makes a bunch of get requests
const getTweets = (options) => { //so basically, we sample each of the past 20 days for Tweets from each. In my view, this leads to a better quality sample. We could use the 'next' property from one, but that would (a) add complexity, and (b) 
  for (let i = 1; i < 21; i ++) {//Note that we do not wait for one response to come in before firing the next request
    let newOptions = options; 
    
    let from = i; //we use i obtain number for Twitter's fromDate and toDate parameters
    let to = i + 1;

    if (from < 10) { //a little bit of housekeeping - for numbers 1-9, we want them to read 01 through 09
      from = '0' + from
    }
    if (to < 10) {
      to = '0' + to
    }

    newOptions.url += '&fromDate=201806' + from + '0000&toDate=201806' + to + '0000' //we add date params to our existing url
    throttledRequest(newOptions, (error, response, body) => {
      if (error) {
        console.log('Error making search request.');
        console.log(error);
        return
      }
      
      let builderString = '' //we create a string - this will ultimately be appended to the csv we have created
      body.results.forEach((tweet) => {
        tweet.text = tweet.text.replace(/(\r\n|\n|\r)/gm,"").replace(/,/g , ";"); //remove newline characters and commas from the tweet text
        builderString +=  tweet.id_str + ',' + tweet.user.name + ',' + tweet.favorite_count + ',' + tweet.retweet_count + ',' + tweet.text + "\n";
      })
      
      appendCSV("twitterpants.csv", builderString).then((content) => { //we can call appendCSV asynchronously - we don't have to wait on the results of the writing to the CSV to make our next API call
        console.log("Success: ", content);
      }).catch((error) => {
        console.log("error: ", error);
      });
    })      
  }
} 


//'Driver' function below
writeCSV('twitterpants.csv', "id_str,username,favorite_count,retweet_count, text\n").then((content) => { //create the CSV first, with a line of headers
  getTweets(request_options);
}).catch((error) => {
  console.log("error: ", error);
});

module.exports = {getTweets: getTweets, throttledRequest: throttledRequest, query: query, request_options: request_options};