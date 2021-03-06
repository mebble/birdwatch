const abbreviate = require('number-abbreviate');

const client = require('./utils/twitter-client');

exports.handler = async function(event, context) {
    const { q: query, max_id } = event.queryStringParameters;

    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    };
    try {
        if (query === '' || typeof query === 'undefined' || query === null) {
            throw new Error('The query must be defined');
        }
        const response = await client.get('statuses/user_timeline', {
            screen_name: query,
            tweet_mode: 'extended',
            count: 50,
            trim_user: true,
            exclude_replies: false,
            include_rts: false,
            max_id
        });
        if (max_id) {
            response.shift();
        }
        const new_maxId = response[response.length - 1].id_str;
        const { favs, rets } = splitFavouritesRetweets(response);
        return {
            statusCode: 200,
            body: JSON.stringify({
                favourites: favs,
                retweets: rets,
                maxId: new_maxId,
            }),
            headers
        };
    } catch (err) {
        console.log(err);
        const twitterErrorCode = err[0] && err[0].code // twitter error response
            ? err[0].code
            : null;
        return {
            statusCode: 500,
            body: JSON.stringify({
                twitterErrorCode,
                query,
                error: err
            }),
            headers
        };
    }
};

function splitFavouritesRetweets(tweets) {
    return tweets.reduce(({ favs, rets }, tweet) => {
        const { created_at, id_str, full_text, retweet_count, favorite_count, in_reply_to_status_id_str } = tweet;
        favs.push({
            id_str: 'f' + id_str,
            isReply: Boolean(in_reply_to_status_id_str),
            count: favorite_count,
            count_str: `${abbreviate(favorite_count, 1)}`,
            text: full_text,
            created_at,
        });
        rets.push({
            id_str: 'r' + id_str,
            isReply: Boolean(in_reply_to_status_id_str),
            count: retweet_count,
            count_str: `${abbreviate(retweet_count, 1)}`,
            text: full_text,
            created_at,
        });
        return { favs, rets };
    }, {
        favs: [],
        rets: []
    });
}
