// posts.route.js
const express = require('express');
const Post = require('../models/post');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
};

// Get the absolute path to the images directory
const imagesPath = path.join(__dirname, '..', 'images');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error('Invalid mime type');
        
        if (isValid) {
            error = null;
        } 
        // Use the absolute path for destination
        cb(error, imagesPath);
    }, 
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + ext);
    }
});

router.post('', multer({ storage: storage }).single('image'), (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        imagePath: req.file ? url + '/images/' + req.file.filename : null
    });
    
    post.save()
        .then(createdPost => {            
            res.status(201).json({
                message: 'Post added successfully',
                postId: createdPost._id,
                post: {
                    id: createdPost._id,
                    title: createdPost.title,
                    content: createdPost.content,
                    imagePath: createdPost.imagePath
                }
            });
        })
        .catch(error => {
            console.error('Error saving post:', error);
            res.status(500).json({
                message: 'Creating a post failed!',
                error: error.message
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