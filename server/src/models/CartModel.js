'use strict';

// Importing mongoose and Schema
const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;

// cartItem Schema
const itemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },

  quantity: {
    type: Number,
    required: true
  },

  color: {
    type: String,
    required: true,
  },

  size: {
    type: String,
    required: true
  }

}, {
  _id: false
})

const cartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please Enter User-Id'],
    immutable: true,
    unique: true
  },

  items: {
    type: [itemSchema],
    default: []
  }

}, {
  timestamps: true
})

// Creating model from a Schema
const CartModel = mongoose.model('Cart', cartSchema);

module.exports = CartModel;
