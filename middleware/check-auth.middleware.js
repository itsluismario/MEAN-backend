// check-auth.middleware.js

const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '.env.dev' });

const jwt_secret = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, jwt_secret);
        req.userData = { email: decodedToken.email, userId: decodedToken.userId };
        next();
    } catch (error) {        
        res.status(401).json({ message: 'You are not authenticated' });
    }
};