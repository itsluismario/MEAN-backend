// posts.route.js
const express = require('express');
const Post = require('../models/post');
const multer = require('multer');
const path = require('path');
const fs = require('fs'); 
const checkAuth = require('../middleware/check-auth.middleware')

const router = express.Router();

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error('Invalid mime type');
        
        if (isValid) {
            error = null;
        }
        // Create images directory if it doesn't exist
        const imagesDir = path.join(__dirname, '..', 'images');
        if (!fs.existsSync(imagesDir)){
            fs.mkdirSync(imagesDir, { recursive: true });
        }
        cb(error, imagesDir);
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + ext);
    }
});

router.post('', checkAuth, multer({ storage: storage }).single('image'), (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    const imagePath = req.file ? '/images/' + req.file.filename : null;
    
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        imagePath: imagePath ? url + imagePath : null,
        creator: req.userData.userId
    });
    post.save()
        .then(createdPost => {                        
            res.status(201).json({
                message: 'Post added successfully',
                post: {
                    id: createdPost._id,
                    title: createdPost.title,
                    content: createdPost.content,
                    imagePath: createdPost.imagePath,
                    creator: createdPost.creator
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

router.put('/:id', checkAuth, multer({ storage: storage }).single('image'), (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
        const url = req.protocol + '://' + req.get('host');
        imagePath = url + '/images/' + req.file.filename; 
    }
    const updateData = {
        title: req.body.title,
        content: req.body.content,
        imagePath: imagePath,
        creator: req.userData.userId
    };
    
    Post.updateOne(
        { _id: req.params.id, creator: req.userData.userId }, 
        { $set: updateData })           
        .then(result => {
        if (result.modifiedCount > 0) {
            res.status(200).json({ message: 'Update successful!'});
        } else {
            res.status(401).json({ message: 'Not authorized!'});
        }
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
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const postQuery = Post.find();
    let fetchedPosts;
    
    if (pageSize && currentPage) {
        postQuery
            .skip(pageSize * (currentPage - 1))
            .limit(pageSize);
    }
    
    postQuery
        .then(documents => {
            fetchedPosts = documents;      
            return Post.countDocuments();
        })
        .then(count => {
            res.status(200).json({
                message: 'Posts fetched successfully',
                posts: fetchedPosts.map(doc => {                    
                    return {
                        id: doc._id,
                        title: doc.title,
                        content: doc.content,
                        imagePath: doc.imagePath,
                        creator: doc.creator
                    }
                }),       
                maxPosts: count
            });
    });
});

router.delete('/:id', checkAuth,(req, res, next) => {
    Post.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then(result => {        
        if (result.deletedCount > 0) {
            res.status(200).json({ message: 'Post deleted succesfully!'});
        } else {
            res.status(401).json({ message: 'Not authorized!'});
        }
    });
});

module.exports = router;