'use strict';

const express = require('express');

const router = express.Router();

const categorySchema = require('../models/categories-schema.js');

const Model = require('../models/model.js');

const CategoryModel = new Model(categorySchema);

const logCatagories = (req, res, next) => {
  console.log('In the category route');
  next();
};

router.use(logCatagories);


/**
   * This route allows you to GET all categories
   * @route GET /categories
   * @group categories
   * @returns {object} 200 - All objects in the array
   * @returns {error} - if there was an issue reading the category list
   */
router.get('/api/v1/', async (request, response, next) => {
  let results = await CategoryModel.getAllResults({});
  console.log(results.length);
  response.send(results);
});


// GET BY ID
/**
   * This route allows you to GET a category based on the ID
   * @route GET /categories/:id
   * @group categories
   * @returns {object} 200 - One object from  an array
   * @returns {error} - if there was an issue reading the category list
   */
router.get('/:id', async (request, response, next) => {
  let record = await CategoryModel.getById(request.params.id);
  response.send(record);
});

// POST/CREATE AN OBJECT
/**
 * This route allows you to CREATE a category
 * @route POST /categories
 * @group categories
 * @returns {object} 200 - The created object in the array
 * @returns {error} - if there was an issue creating a category
 */
router.post('/api/v1/', async (request, response, next) => {
  let newCategory = await CategoryModel.create({});
  response.send(newCategory);
});

// PUT BY ID /UPDATE
/**
   * This route allows you to UPDATE a category
   * @route PUT /categories/:id
   * @group categories
   * @params {number} id.params.required - the id of the field you want to update
   * @returns {object} 200 - The updated object in the array
   * @returns {error} - if there was an issue updating a category
   */
router.put('/:id', async (request, response, next) => {
  let modifiedRecord = await CategoryModel.update(request.params.id);
  response.send(modifiedRecord);
});


// DELETE BY ID
/**
   * This route allows you to DELETE a category
   * @route DELETE /categories/:id
   * @group categories
   * @params {number} id.params.required - the id of the field you want to delete
   * @returns {object} 200 - A message stating the delete was successful
   * @returns {error} - if there was an issue deleting a category
   */
router.delete('/:id', async (request, response, next) => {
  let modifiedRecord = await CategoryModel.update(request.params.id);
  response.send(modifiedRecord);
});

module.exports = router;