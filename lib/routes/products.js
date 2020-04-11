'use strict';

const express = require('express');

const router = express.Router();
const productSchema = require('../models/products-schema.js');
const Model = require('../models/model.js');

const ProductModel = new Model(productSchema);

const logProducts = (req, res, next) => {
  console.log('In the product route');
  next();
};

router.use(logProducts);


// GET ALL PRODUCTS
/**
 * This route allows you to GET all products
 * @route GET /products
 * @group products
 * @returns {object} 200 - All objects in the array
 * @returns {error} - if there was an issue reading the product list
 */
router.get('/api/v1/', async (request, response, next) => {
  let results = await ProductModel.getAllResults({});
  console.log(results.length);
  response.send(results);
});


// GET PRODUCTS BY ID
router.get('/:id', async (request, response, next) => {
  let record = await ProductModel.getById(request.params.id);
  response.send(record);
});


// POST/CREATE AN ENTRY
/**
   * This route allows you to CREATE a product
   * @route POST /products
   * @group products
   * @returns {object} 200 - The created object in the array
   * @returns {error} - if there was an issue creating a product
   */
router.post('/api/v1/', async (request, response, next) => {
  let newProduct = await ProductModel.create({});
  response.send(newProduct);
});


// PUT/UPDATE AN ENTRY
/**
   * This route allows you to UPDATE a product
   * @route PUT /products/:id
   * @group products
   * @params {number} id.params.required - the id of the field you want to update
   * @returns {object} 200 - The updated object in the array
   * @returns {error} - if there was an issue updating a product
   */
router.put('/:id', async (request, response, next) => {
  let modifiedRecord = await ProductModel.update(request.params.id);
  response.send(modifiedRecord);
});


// DELETE BY ID
/**
   * This route allows you to DELETE a product
   * @route DELETE /products/:id
   * @group products
   * @params {number} id.params.required - the id of the field you want to delete
   * @returns {object} 200 - A message stating the delete was successful
   * @returns {error} - if there was an issue deleting a product
   */
router.delete('/:id', async (request, response, next) => {
  let modifiedRecord = await ProductModel.update(request.params.id);
  response.send(modifiedRecord);
});


module.exports = router;