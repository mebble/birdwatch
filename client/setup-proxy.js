import proxy from 'http-proxy-middleware';

export default (app) => {
    app.use(proxy('/.netlify/functions/', {
        target: 'http://localhost:9000/',
        "pathRewrite": {
            "^/\\.netlify/functions": ""
        }
    }));
};
