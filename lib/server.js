'use strict';

const express = require('express');
const generateSwagger = require('../docs/swagger.js');
const cors = require('cors');
let morgan = require('morgan');
const mongoose = require('mongoose');
const productRouter = require('./routes/products.js');
const categoryRouter = require('./routes/categories.js');


// let data = require('../db.json');
const notFound = require('../middleware/404.js');
// Not sure where to use the 500 error middleware
const properError = require('../middleware/500.js');



const app = express();

const startServer = (port, mongodb) =>  {
  let options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true};
  mongoose.connect(mongodb, options);
  app.listen(port, () => {
    console.log('Server is up and running on port', port);
  });
};

generateSwagger(app);

app.use(cors);
app.use(morgan('dev'));

/**
 * This route gives you a standard "Homepage" message
 * @route GET /
 * @group NonAPI
 * @produces text/html
 * @returns {object} 200 - The HTML to show on the homepage
 */
app.get('/api/v1/', (request, response) => {
  response.status(200);
  response.send('<h1>Homepage</h1>');
});

app.use('/products', productRouter);
app.use('/categories', categoryRouter);

//ANY request, if it doesn't match above, send the 404. This runs top to bottom = put things out of order, will not work
app.use('*', notFound);

module.exports = {
  server: app,
  start: startServer,
};





// NOTES FOR LATER
// app.use(express.json());
// see 757 for router connection
// 759 shows how to use logger middleware "in veggie route"
