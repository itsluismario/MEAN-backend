// app.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const path = require('path');

const postsRoutes = require('./routes/posts.route');
const userRoutes = require('./routes/users.route');

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
app.use('/images', express.static(path.join(__dirname, 'images')));

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
app.use('/api/users',userRoutes);

// Error handling middleware for file serving
app.use((err, req, res, next) => {
    if (err.code === 'ENOENT') {
        res.status(404).json({ message: 'File not found' });
    } else {
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = app;