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
