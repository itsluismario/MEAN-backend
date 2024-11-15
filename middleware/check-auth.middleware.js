// check-auth.middleware.js

const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '.env.dev' });

const jwt_secret = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, jwt_secret);
        next();
    } catch (error) {
        res.status(401).json({ message: 'Auth failed' });
    }
};