// posts.route.js
const express = require('express');
const checkAuth = require('../middleware/check-auth.middleware')
const extractFile = require('../middleware/file.middleware')
const PostController = require('../controllers/post.controller');

const router = express.Router();

router.post('', checkAuth, extractFile, PostController.createPost);

router.put('/:id', checkAuth, extractFile, PostController.updatePost);

router.get('/:id', PostController.getPost);

router.get('', PostController.getPosts);

router.delete('/:id', checkAuth, PostController.deletePost);

module.exports = router;