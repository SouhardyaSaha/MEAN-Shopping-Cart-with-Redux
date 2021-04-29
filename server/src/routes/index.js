('use strict');

// Importing the app error class
const AppError = require('../utils/appError');
const userRouter = require('./userRoutes');
const uploadRouter = require('./uploadRoutes');
const productRouter = require('./productRoutes');

// Importing express router
const router = require('express').Router();

// Registering all routers
router.use('/users', userRouter);
router.use('/products', productRouter);
router.use('/upload', uploadRouter);

// The 404 route
router.all('*', (req, res, next) => next(new AppError('No Endpoint Found', 404)));

module.exports = router;
