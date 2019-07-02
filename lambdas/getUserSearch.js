const client = require('./utils/twitter-client');
const response = require('../mock-users.json');

exports.handler = async function(event, context) {
    // const { query } = JSON.parse(event.body);
    // console.log(query);
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    };
    try {
        // const response = await client.get('users/search', {
        //     q: query,
        //     count: 5
        // });
        const users = response.map(({ name, screen_name, profile_image_url_https }) => ({
            name,
            screen_name,
            profile_url: profile_image_url_https
        }));
        return {
            statusCode: 200,
            body: JSON.stringify(users),
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
