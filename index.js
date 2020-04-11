'use strict';

require('dotenv').config();

const app = require('./lib/server.js');
const port = process.env.PORT;
const mongdb = process.env.MONGODB_URI;


app.start(port, mongdb);
