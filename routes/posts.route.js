// posts.route.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs'); 
const checkAuth = require('../middleware/check-auth.middleware')

const PostController = require('../controllers/post.controller');

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

router.post('', checkAuth, multer({ storage: storage }).single('image'), PostController.createPost);

router.put('/:id', checkAuth, multer({ storage: storage }).single('image'), PostController.updatePost);

router.get('/:id', PostController.getPost);

router.get('', PostController.getPosts);

router.delete('/:id', checkAuth, PostController.deletePost);

module.exports = router;