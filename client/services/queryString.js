export const parseQueryString = (queryString) => {
    /**
     * Parse the query string into an app state object
     * Certain state fields are true by default
     */
    const {
        q = null,
        f = true,
        r = true,
        s = false,
        l = false
    } = decodeURI(queryString)
        .replace('?', '')
        .split('&')
        .map(component => {
            let [ key, value ] = component.split('=');
            if (['f', 'r', 's', 'l'].includes(key)) {
                value = value === '1'
                    ? true
                    : false;
            }
            return [ key, value ];
        })
        .reduce((values, [key, value]) => {
            values[key] = value
            return values
        }, {});
    return {
        userQuery: q,
        metric: f ? 'favourites' : 'retweets',
        withReplies: r,
        sorted: s,
        logScale: l,
    };
}

export const toQueryString = (appState) => {
    /**
     * Extract some fields of the app state object into a querystring
     * The defaultness of the fields as defined in 'parseQueryString' is taken into consideration
     */
    const { userQuery, metric, withReplies, sorted, logScale } = appState;
    let queryString = '?';
    if (userQuery)                  queryString += `q=${userQuery}`;
    if (metric      === 'retweets') queryString += '&f=0';
    if (withReplies === false)      queryString += '&r=0';
    if (sorted      === true)       queryString += '&s=1';
    if (logScale    === true)       queryString += '&l=1';

    return queryString;
};
