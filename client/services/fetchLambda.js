export default (url) => {
    return fetch(`http://192.168.2.29:9000/${url}`)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject({ message: res.statusText, statusCode: res.status });
            });
};
