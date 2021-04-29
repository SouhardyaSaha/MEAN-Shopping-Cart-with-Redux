'use strict';

const ProductModel = require('../models/ProductModel');
// Importing the model
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// Function to get all products
const getProducts = catchAsync(async (req, res, next) => {

  const { sortBy, limit, skip } = req.query

  const sort = {};
  if (sortBy) {
    const parts = sortBy.split(':');
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;  // -1 for descending data and 1 for asc
  }

  const products = await ProductModel
    .find(
      {},
      [],
      {
        limit: parseInt(limit), // if limit is undefined then it will be ignored automatically
        skip: parseInt(skip),
        sort
      }
    )

  res.status(200).json({
    success: true,
    body: { products },
  });
});

const getProductById = catchAsync(async (req, res, next) => {
  const { productId } = req.params
  const product = await ProductModel.findById(productId)

  res.status(200).json({
    success: true,
    body: { product },
  });
});

// Function to create a product
const createProduct = catchAsync(async (req, res, next) => {
  const product = await ProductModel.create(req.body)

  res.status(201).json({
    success: true,
    body: { product },
  });
});

// Function to update a product
const updateProduct = catchAsync(async (req, res, next) => {
  const { productId } = req.params

  const product = await ProductModel
    .findByIdAndUpdate(productId, req.body, { new: true, runValidators: true })

  if (!product) return next(new AppError('Not Found', 404));

  res.status(200).json({
    success: true,
    body: { product },
  });
});

// Function to delete a product
const deleteProduct = catchAsync(async (req, res, next) => {
  const { productId } = req.params
  let product = await ProductModel.findByIdAndDelete(productId);
  if (!product) return next(new AppError('Not Found', 404));

  res.status(200).json({
    success: true,
    body: { product },
  });
});

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
