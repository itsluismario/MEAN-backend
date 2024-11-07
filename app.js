// app.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const postsRoutes = require('./routes/posts.route');

require('dotenv').config({ path: '.env.dev' });

const mongoUri = process.env.MONGODB_URI;

mongoose.connect(mongoUri)
    .then(() => {
        console.log('Connected to database!');
    })
    .catch(() => {
        console.log('Connection failed!');
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
    // Comentarios explicativos
    res.setHeader(
        'Access-Control-Allow-Origin', 
        'http://localhost:4200'
    );
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    );
    next();
});

app.use('/api/posts',postsRoutes);

module.exports = app;