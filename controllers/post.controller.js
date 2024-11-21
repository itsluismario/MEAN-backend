// posts.route.js
const Post = require('../models/post');

exports.createPost = (req, res, next) => {
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
            res.status(500).json({
                message: 'Creating a post failed!',
                error: error.message
            });
        });
}

exports.updatePost = (req, res, next) => {
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
        if (result.matchedCount > 0) {
            res.status(200).json({ message: 'Update successful!'});
        } else {
            res.status(401).json({ message: 'Not authorized!'});
        }
    })
    .catch(error => {
        res.status(500).json({
            message: 'Could not update the post'
        })
    }); 
}

exports.getPost = (req, res, next) => {
    Post.findById(req.params.id).then(post => {
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({message: 'Post not found!'})
        }
    })
    .catch(error => {
        res.status(500).json({
            message: 'Fetching post failed'
        })
    }); 
}

exports.getPosts = (req, res, next) => {
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
    })
    .catch(error => {
        res.status(500).json({
            message: 'Fetching posts failed'
        })
    }); 
}

exports.deletePost = (req, res, next) => {
    Post.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then(result => {        
        if (result.deletedCount > 0) {
            res.status(200).json({ message: 'Post deleted succesfully!'});
        } else {
            res.status(401).json({ message: 'Not authorized!'});
        }
    })
    .catch(error => {
        res.status(500).json({
            message: 'Deleting post failed'
        })
    }); 
}