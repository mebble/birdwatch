export default (queryString) => {
    const { q = null } = decodeURI(queryString)
        .replace('?', '')
        .split('&')
        .map(component => component.split('='))
        .reduce((values, [key, value]) => {
            values[key] = value
            return values
        }, {});
    return {
        userQuery: q
    };
}
