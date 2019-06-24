require('dotenv').config();
const Twitter = require('twitter');

const tweets = require('../mock-tweets.json');

const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    bearer_token: process.env.TWITTER_BEARER_TOKEN
});

exports.handler = async function(event, context) {
    // const { screenName } = JSON.parse(event.body);
    // console.log(screenName);
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    };
    try {
        // const options = {
        //     screen_name: 's8n',
        //     tweet_mode: 'extended',
        //     count: 200,
        //     trim_user: true,
        //     exclude_replies: true,
        //     include_rts: false,
        // };
        // const res = await client.get('statuses/user_timeline', options);
        // console.log(res);
        const res = await tweets;
        res.sort((t1, t2) => {
            const d1 = new Date(t1.created_at);
            const d2 = new Date(t2.created_at);
            if (d1 < d2) return -1;
            if (d1 > d2) return 1;
            return 0;
        });
        const { lightTweets, favs, rets } = splitFavouritesRetweets(res);
        return {
            statusCode: 200,
            body: JSON.stringify({
                tweets: lightTweets,
                favourites: favs,
                retweets: rets
            }),
            // body: JSON.stringify(res),
            headers
        };
    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: JSON.stringify(err),
            headers
        };
    }
};

function splitFavouritesRetweets(tweets) {
    return tweets.reduce(({ lightTweets, favs, rets }, tweet) => {
        const { created_at, id_str, full_text, retweet_count, favorite_count } = tweet;
        lightTweets.push({ created_at, id_str, full_text });
        favs.push(favorite_count);
        rets.push(retweet_count);
        return { lightTweets, favs, rets };
    }, {
        lightTweets: [],
        favs: [],
        rets: []
    });
}
