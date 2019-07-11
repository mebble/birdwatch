export default (path) => {
    return fetch(`http://192.168.1.7:9000/${path}`)
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
