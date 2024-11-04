// app.js
const express = require('express');

const app = express();

app.use('/api/posts', (req, res, next) => {
    const posts = {
        id: 'sdfnad',
        title: 'First server-side post',
        content: 'This is coming from the server'
    };
    res.json({
        message: 'Posts fetched succesfully',
        posts: posts
    });
});

module.exports = app;