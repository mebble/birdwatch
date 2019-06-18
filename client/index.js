document.getElementById('test-btn').addEventListener('click', () => {
    fetch('http://localhost:9000/foo')
        .then(res => res.json())
        .then(json => {
            console.log(json);
        })
        .catch(err => console.log(err));
});
