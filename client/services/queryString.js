export const parseQueryString = (queryString) => {
    /**
     * Parse the query string into an app state object
     * Certain state fields are true by default
     */
    const {
        q = null,
        m = 'favourites',
        r = true,
        s = false,
        l = false
    } = decodeURI(queryString)
        .replace('?', '')
        .split('&')
        .map(component => {
            let [ key, value ] = component.split('=');
            if (['r', 's', 'l'].includes(key)) {
                value = value === '1'
                    ? true
                    : false;
            }
            if (key === 'm') {
                value = value === 'r'
                    ? 'retweets'
                    : 'favourites';
            }

            return [ key, value ];
        })
        .reduce((values, [key, value]) => {
            values[key] = value;
            return values;
        }, {});
    return {
        userQuery: q,
        metric: m,
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
    const components = [];
    if (userQuery)                  components.push(`q=${userQuery}`);
    if (metric      === 'retweets') components.push('m=r');
    if (withReplies === false)      components.push('r=0');
    if (sorted      === true)       components.push('s=1');
    if (logScale    === true)       components.push('l=1');

    const queryString = `?${components.join('&')}`;

    return queryString;
};
