const client = require('./utils/twitter-client');
// const response = require('../mock-tweets.json');

exports.handler = async function(event, context) {
    const { q: query } = event.queryStringParameters;
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    };
    try {
        const response = await client.get('statuses/user_timeline', {
            screen_name: query,
            tweet_mode: 'extended',
            count: 50,
            trim_user: true,
            exclude_replies: false,
            include_rts: false,
        });
        response.sort((t1, t2) => {
            const d1 = new Date(t1.created_at);
            const d2 = new Date(t2.created_at);
            if (d1 < d2) return -1;
            if (d1 > d2) return 1;
            return 0;
        });
        const { favs, rets } = splitFavouritesRetweets(response);
        return {
            statusCode: 200,
            body: JSON.stringify({
                favourites: favs,
                retweets: rets
            }),
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
    return tweets.reduce(({ favs, rets }, tweet) => {
        const { created_at, id_str, full_text, retweet_count, favorite_count, in_reply_to_status_id_str } = tweet;
        favs.push({
            id_str: 'f' + id_str,
            in_reply_to_status_id_str,
            count: favorite_count,
            text: full_text,
            created_at,
        });
        rets.push({
            id_str: 'r' + id_str,
            in_reply_to_status_id_str,
            count: retweet_count,
            text: full_text,
            created_at,
        });
        return { favs, rets };
    }, {
        favs: [],
        rets: []
    });
}
