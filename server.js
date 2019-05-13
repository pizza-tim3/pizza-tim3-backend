const express = require('express');
const cors = require('cors');
const server = express();
const logger = require('morgan');
const helmet = require('helmet');

// Add Cross-origin resource sharing, protect server app with helmet, add logging middleware to our server )
server.use(express.json(), cors(), helmet(), logger('dev'));

const userRoutes = require('./users/userRoutes');

// Home Route
server.get('/', (req, res) => {
    res.status(200).json('Home Page up and running')
});

// Users Resource Route
server.use('/api/users/', userRoutes);

module.exports = server;