'use strict';

const CartModel = require('../models/CartModel');
// Importing the model
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const getCart = catchAsync(async (req, res, next) => {
    const cart = await CartModel.findOne({ user: req.user.id }).populate('items.product', 'name price')
    if (!cart) return next(new AppError('No Cart Found', 404));

    res.status(200).json({
        success: true,
        body: { cart },
    });
});

const getItemIndex = (item, cart) => {
    for (let i = 0; i < cart.length; i++) {
        if (
            cart[i].size == item.size &&
            cart[i].color == item.color &&
            cart[i].product == item.product
        ) {
            return i;
        }
    }
    return -1;
}

// Function to update a cart
const addToCart = catchAsync(async (req, res, next) => {
    const item = {
        ...req.body,
        product: req.body.product._id
    }

    // loading the cart
    const cart = await CartModel.findOne({ user: req.user.id })
    if (!cart) return next(new AppError('No Cart Found', 404));

    const index = getItemIndex(item, cart.items)
    if (index === -1) {
        cart.items.push(item)
    } else {
        cart.items[index].quantity += item.quantity
    }

    await cart.save()
    await cart.populate('items.product', 'name price').execPopulate()

    res.status(200).json({
        success: true,
        body: { cart },
    });
});


const removeItemOperation = (item, cart) => {
    // [].splice()
    for (let i = 0; i < cart.length; i++) {
        if (
            cart[i].size == item.size &&
            cart[i].color == item.color &&
            cart[i].product == item.product
        ) {
            // console.log('Matching Item', cart[i]);
            cart.splice(i, 1)
            // console.log('after splicing', cart);
            break;
        }
    }
    return cart;
}
const removeFromCart = catchAsync(async (req, res, next) => {
    const item = {
        ...req.body,
        product: (req.body.product._id)
    }

    // loading the cart
    const cart = await CartModel.findOne({ user: req.user.id })
    if (!cart) return next(new AppError('No Cart Found', 404));
    // removing the item
    // console.log('Before Filter', cart.items);
    cart.items = removeItemOperation(item, cart.items)
    // console.log('after filter', cart.items);
    await cart.save()
    await cart.populate('items.product', 'name price').execPopulate()

    res.status(200).json({
        success: true,
        body: { cart },
    });
});

const clearCart = catchAsync(async (req, res, next) => {
    // loading the cart
    const cart = await CartModel.findOne({ user: req.user.id })
    if (!cart) return next(new AppError('No Cart Found', 404));

    cart.items = []
    await cart.save()

    res.status(200).json({
        success: true,
        body: { cart },
    });
});

const updateCart = catchAsync(async (req, res, next) => {
    // loading the cart
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
    addToCart,
    removeFromCart,
    clearCart,
    updateCart
};




// cart.items = cart.items.filter((cartItem) =>
// // {
// // console.log(cartItem);
// // return (
// (cartItem.product != item.product &&
//     cartItem.color != item.color &&
//     cartItem.size != item.size)
//     // )
//     // return cartItem != item
//     // }
// )