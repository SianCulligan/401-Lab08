'use strict';

const mongoose = require('mongoose');

const schema = mongoose.Schema({
  name: { type: 'string', required: true},
  display_name: { type: 'string', required: true},
  descrition: { type: 'string', required: true},
});

const model = mongoose.model('categories', schema);

module.exports = model;
