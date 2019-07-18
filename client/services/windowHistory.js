import { toQueryString } from './queryString';

export const pushHistory = (appState) => {
    const { userQuery, metric, withReplies, sorted, logScale } = appState;
    window.history.pushState({
        userQuery,
        metric,
        withReplies,
        sorted,
        logScale
    }, userQuery, toQueryString({
        userQuery,
        metric,
        withReplies,
        sorted,
        logScale
    }));
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
