export default (path) => {
    return fetch(`/.netlify/functions/${path}`)
            .then(res => res.json())
            .then(json => {
                if (json.twitterErrorCode) {
                    return Promise.reject({ code: json.twitterErrorCode, query: json.query });  // twitter error response
                } else if (json.error) {
                    return Promise.reject({ code: -1, query: json.query });  // other error response
                }
                return json;
            });
};
