'use strict';

const { createProduct, getProducts, updateProduct, deleteProduct, getProductById } = require('../controllers/productController');

// Importing the express router
const productRouter = require('express').Router();

// Setting up the routes
productRouter.route('/')
    .post(createProduct)
    .get(getProducts)

productRouter.route('/:productId')
    .get(getProductById)
    .put(updateProduct)
    .delete(deleteProduct)

module.exports = productRouter;
