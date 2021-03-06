const purgecss = require('@fullhuman/postcss-purgecss')({
    content: [
        './client/**/*.html',
        './client/App.js',
        './client/index.js',
        './client/containers/**/*.js',
        './client/components/**/*.js',
    ],
    defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
});

module.exports = {
    plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
        ...process.env.NODE_ENV === 'production'
            ? [purgecss]
            : []
    ]
};
