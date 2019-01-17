# twitterpants
Retrieve Tweets by Hashtag, from the Command
================================================

Description
-----------

A command line tool that accepts user arguments, searches the Twitter API with that information, and then saves the results to a CSV. If the user does not provide any CLI input, the application searches for tweets containing '#iot'

You'll need.
------------
Version 8 or greater of Nodejs - this is required to support the util.promisify feature.
OAuth credentials.

NOTE: If you supply your own credentials, you will need to change the 'Dev.json' part of the url to reflect your own dev environment in Twitter's Dashboard
Instructions
------------

Clone this repo
Run npm i
Then type node twiiterpants.js, followed by the hashtag you wish to search by. If you do not provide one, we will search for '#iot'
The application will then create a CSV file in this folder with your results.

NOTE: Owing to limitations of the CSV format, new line characters have been removed from the data, and commas replaced by semicolons

Test
----

Run npm test to execute unit tests (please note that this will make api calls, and will therefore consume against credentials)

Technologies
------------

Nodejs, Mocha, and a throttler package from npm

