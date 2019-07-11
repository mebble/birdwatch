export default (path) => {
    return fetch(`/.netlify/functions/${path}`)
            .then(res => res.json())
            .then(json => {
                if (json.twitterErrorCode) {
                    return Promise.reject({ code: json.twitterErrorCode });  // twitter error response
                } else if (json.error) {
                    return Promise.reject({ code: -1 });  // other error response
                }
                return json;
            });
};
