const express = require('express');

const app = express();

app.use((req, res, next) => {
    console.log('Poop');
    
    next();
});

app.use((req, res, next) => {
    res.send('Hola');
});

module.exports = app;