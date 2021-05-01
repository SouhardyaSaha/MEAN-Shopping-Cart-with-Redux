'use strict';

const { addToCart, getCart, removeFromCart, clearCart } = require('../controllers/cartController');
// Importing functions from the controller
const {
  getUser,
  signUp,
  getSingleUser,
  login,
  logout,
} = require('../controllers/userController');
const { protect } = require('../middlewares/protect');

// Importing the express router
const userRouter = require('express').Router();

// Setting up the routes
userRouter.route('/').get(protect, getUser).post(signUp);

userRouter.route('/cart')
  .get(protect, getCart);

userRouter.route('/cart/add')
  .patch(protect, addToCart);

userRouter.route('/cart/remove')
  .patch(protect, removeFromCart);

userRouter.route('/cart/clear')
  .patch(protect, clearCart);

userRouter.route('/login').post(login);

userRouter.route('/logout').get(logout);

userRouter.route('/:id').get(getSingleUser);

module.exports = userRouter;
