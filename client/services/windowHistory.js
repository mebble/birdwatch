import { toQueryString } from './queryString';

export const updateWindowHistory = (appState, updateType) => {
    const { userQuery, metric, withReplies, sorted, logScale } = appState;
    const queryString = toQueryString(appState);
    const stateObject = {
        userQuery,
        metric,
        withReplies,
        sorted,
        logScale
    };
    const stateTitle = userQuery === null
        ? ''
        : userQuery;
    const stateUrl = queryString === ''
        ? ''
        : `?${queryString}`;

    if (updateType === 'replace') {
        window.history.replaceState(stateObject, stateTitle, stateUrl);
    } else if (updateType === 'push') {
        window.history.pushState(stateObject, stateTitle, stateUrl);
    } else {
        throw new Error('Undefined window history update type');
    }
};

export const diffAppHistory = (appState) => {
    const {
        userQuery: u1,
        metric: m1,
        withReplies: w1,
        sorted: s1,
        logScale: l1
    } = window.history.state;
    const {
        userQuery: u2,
        metric: m2,
        withReplies: w2,
        sorted: s2,
        logScale: l2
    } = appState;
    return u1 !== u2 || m1 !== m2 || w1 !== w2 || s1 !== s2 || l1 !== l2;
};
