'use strict';

// Imports
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const cookieParser = require('cookie-parser');
const expressMongoSanitize = require('express-mongo-sanitize');
const xssClean = require('xss-clean');
const compression = require('compression');
const path = require('path')
const cors = require('cors')

// Creating the express app
const app = express();

// Security Middleware
app.use(helmet());

// Compression Middleware
app.use(compression());

// Parsing JSON, Form-Data and Cookies
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

// Static Directory 
app.use('/files', express.static(path.join(__dirname, '../public/storage/files')))

// Sanitizing user data
app.use(expressMongoSanitize());

// Prevent XSS attacks
app.use(xssClean());

app.use(cors())

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Testing a route
app.get('/', (req, res) => {
  res.send('Hello');
});

// Register the routers
app.use(router);

// Using the errorHandler middleware
app.use(errorHandler);

// Exporting the app
module.exports = app;
