const client = require('./utils/twitter-client');

exports.handler = async function(event, context) {
    const { q: query } = event.queryStringParameters;

    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    };
    try {
        if (query === '' || typeof query === 'undefined' || query === null) {
            throw new Error('The query must be defined');
        }
        const response = await client.get('users/show', {
            screen_name: query
        });
        const { name, verified, screen_name, profile_image_url_https } = response;
        return {
            statusCode: 200,
            body: JSON.stringify({
                name,
                verified,
                screenName: screen_name,
                imgUrl: profile_image_url_https,
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
                error: err
            }),
            headers
        };
    }
};
