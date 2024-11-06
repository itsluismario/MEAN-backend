// app.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const Post = require('./models/post');

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

app.post('/api/posts', (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save()
        .then(createdPost => {            
            res.status(201).json({
                message: 'Post added successfully',
                postId: createdPost._id,
                post: {
                    id: createdPost._id,
                    title: createdPost.title,
                    content: createdPost.content
                }
            });
        });
});

app.put('/api/posts/:id', (req, res, next) => {
    const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content
    });
    Post.updateOne(
        { _id: req.params.id },  // filter criteria
        { $set: post }           // update document
        ).then(result => {
        res.status(200).json({ message: 'Update successful!'});
    });
});

app.get('/api/posts', (req, res, next) => {
    Post.find().then(documents => {
        res.status(200).json({
            message: 'Posts fetched succesfully',
            posts: documents.map(doc => {
                return {
                    id: doc._id,
                    title: doc.title,
                    content: doc.content
                };
            })        
        });
    });
});

app.delete('/api/posts/:id', (req, res, next) => {
    Post.deleteOne({ _id: req.params.id }).then(result => {
        res.status(200).json({message: 'Post deleted succesfully'}); 
    });

});

module.exports = app;