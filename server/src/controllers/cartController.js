'use strict';

const CartModel = require('../models/CartModel');
// Importing the model
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const getCart = catchAsync(async (req, res, next) => {
    const cart = await CartModel.findOne({ user: req.user.id })
    if (!cart) return next(new AppError('No Cart Found', 404));

    res.status(200).json({
        success: true,
        body: { cart },
    });
});

// Function to update a cart
const updateCart = catchAsync(async (req, res, next) => {
    const cart = await CartModel.findOne({ user: req.user.id })
    if (!cart) return next(new AppError('No Cart Found', 404));

    cart.items = req.body.items
    await cart.save()

    res.status(200).json({
        success: true,
        body: { cart },
    });
});

module.exports = {
    getCart,
    updateCart
};
