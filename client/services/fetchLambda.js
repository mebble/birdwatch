const fetchLambda = (path) => {
    return fetch(`http://192.168.2.29:9000/${path}`)
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

export const fetchTweets = (screenName, maxId) => {
    let queryString = `q=${screenName}`;
    if (maxId) queryString += `&max_id=${maxId}`;

    return fetchLambda(`getTweetEngagement?${queryString}`);
};

export const fetchUserInfo = (screenName) => {
    return fetchLambda(`getUserInfo?q=${screenName}`);
};

export const fetchData = (userQuery) => {
    const tweetsPromise = fetchTweets(userQuery);
    const userInfoPromise = fetchUserInfo(userQuery);
    return Promise.all([tweetsPromise, userInfoPromise]);
};

export default fetchLambda;
