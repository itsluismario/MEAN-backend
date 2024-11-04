// app.js
const express = require('express');

const app = express();

app.use((req, res, next) => {
    res.setHeader(
        'Access-Control-Allow-Origin', 
        '*'
    );
    res.setHeader(
        'Acccess-Control-Allow-Header',
        'Origin, X-Request-Wtih, Content-Type, Accept'
    );
    res.setHeader(
        'Acccess-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE OPTIONS'
    );
    next();
})

app.use('/api/posts', (req, res, next) => {
    const posts = [
        { 
            id: 'sdfnad',
            title: 'First server-side post',
            content: 'This is coming from the server'
        }
    ];
    res.status(200).json({
        message: 'Posts fetched succesfully',
        posts: posts
    });
});

module.exports = app;