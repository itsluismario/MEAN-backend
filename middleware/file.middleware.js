// file.middleware.js
const path = require('path');
const fs = require('fs'); 
const multer = require('multer');

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

module.exports = multer({ storage: storage }).single('image');