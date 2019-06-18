document.getElementById('test-btn').addEventListener('click', () => {
    fetch('/.netlify/functions/foo')
        .then(res => res.json())
        .then(json => {
            console.log(json);
        })
        .catch(err => console.log(err));
});
