const client = require('./utils/twitter-client');

exports.handler = async function(event, context) {
    const { q: query } = event.queryStringParameters;
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    };
    try {
        const response = await client.get('users/search', {
            q: query,
            count: 5
        });
        const users = response.map(({ name, screen_name, profile_image_url_https, verified }) => ({
            name,
            screenName: screen_name,
            imgUrl: profile_image_url_https,
            verified,
        }));
        return {
            statusCode: 200,
            body: JSON.stringify(users),
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
