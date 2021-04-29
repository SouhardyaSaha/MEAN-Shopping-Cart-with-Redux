'use strict';

// Importing mongoose and Schema
const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;

const variantSchema = new Schema({
  color: {
    type: String,
    required: true
  },

  size: {
    type: [String],
    required: true
  },

  quantity: {
    type: Number,
    required: true
  }
})

// Product Database Schema
const productSchema = new Schema({

  name: {
    type: String,
    trim: true,
    required: [true, 'Please Enter Name']
  },

  price: {
    type: Number,
    trim: true,
    required: [true, 'Please Enter Price']
  },

  available: {
    type: Boolean,
    required: true,
    default: true,
  },

  variants: {
    type: [variantSchema]
  }

}, {
  timestamps: true
})

// Creating model from a Schema
const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;
