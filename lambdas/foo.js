require('dotenv').config();
const Twitter = require('twitter');

const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    bearer_token: process.env.TWITTER_BEARER_TOKEN
});

exports.handler = function(event, context, callback) {
    const { screenName } = JSON.parse(event.body);
    console.log(screenName);
    client.get('statuses/user_timeline', { screen_name: screenName, tweet_mode: 'extended' })
        .then(res => {
            callback(null, {
                statusCode: 200,
                body: JSON.stringify(res),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        })
        .catch(err => {
            console.log('Twitter error!');
            console.log(err);
            callback(err);
        });
};
