'use strict';

const mongoose = require('mongoose');

const schema = mongoose.Schema({
  category: { type: 'string', required: true},  
  name: { type: 'string', required: true},
  display_name: { type: 'string', required: true},
  descrition: { type: 'string', required: true},
});

const model = mongoose.model('products', schema);

module.exports = model;
