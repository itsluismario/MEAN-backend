// posts.route.js
const express = require('express');
const Post = require('../models/post');

const router = express.Router();

router.post('', (req, res, next) => {
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

router.put('/:id', (req, res, next) => {
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

router.get('/:id', (req, res, next) => {
    Post.findById(req.params.id).then(post => {
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({message: 'Post not found!'})
        }
    });
});

router.get('', (req, res, next) => {
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

router.delete('/:id', (req, res, next) => {
    Post.deleteOne({ _id: req.params.id }).then(result => {
        res.status(200).json({message: 'Post deleted succesfully'}); 
    });

});

module.exports = router;