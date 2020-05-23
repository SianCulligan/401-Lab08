'use strict';

const express = require('express');
const generateSwagger = require('../docs/swagger.js');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const productRouter = require('./routes/products.js');
const categoryRouter = require('./routes/categories.js');


// let data = require('../db.json');
const notFound = require('./middleware/404.js');
// Not sure where to use the 500 error middleware
// const properError = require('./middleware/500.js');



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

app.use(cors());
app.use(morgan('dev'));


/**
 * This route gives you a standard "Homepage" message
 * @route GET /
 * @group NonAPI
 * @produces text/html
 * @returns {object} 200 - The HTML to show on the homepage
 */
app.get('/', (request, response) => {
  response.status(200);
  response.send('Homepage');
});

app.use('/api/v1/products', productRouter);
app.use('/api/v1/categories', categoryRouter);

//ANY request, if it doesn't match above, send the 404. This runs top to bottom = put things out of order, will not work
app.use('*', notFound);
// app.use(properError);

module.exports = {
  server: app,
  start: startServer,
};





// NOTES FOR LATER
// app.use(express.json());
// see 757 for router connection
// 759 shows how to use logger middleware "in veggie route"
