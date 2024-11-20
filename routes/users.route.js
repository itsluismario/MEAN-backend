// user.route.js
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '.env.dev' });

const router = express.Router();

const jwt_secret = process.env.JWT_SECRET;

router.post("/signup", (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(result => {
                    res.status(201).json({
                        message: 'User created',
                        result: result
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        message: 'Email already in use',
                        error: err
                    });
                });
        })
});

router.post('/login', (req, res, next) => {
    let fetchedUser;    
    User.findOne({ email: req.body.email })
        .then(user => {
            if(!user) {
                return res.status(401).json({
                    message: 'Invalid authentication'
                });
            }
            fetchedUser = user;
            return bcrypt.compare(req.body.password, user.password);
        })
    .then(result => {
        if (!result) {
            return res.status(401).json({
                message: 'Invalid authentication'
            })
        }
        const token = jwt.sign(
            { email: fetchedUser.email, userId: fetchedUser._id }, 
            jwt_secret, 
            { expiresIn: '1h' }
        )
        return res.status(200).json({
            token: token,
            expiresIn: 3600,
            userId: fetchedUser._id
        })
    })
    .catch(err => {
        console.log(err);
        return res.status(401).json({
            message: 'Invalid authentication'
        });
    })
})

module.exports = router;