'use strict';

const app = require('./lib/server.js');
const port = process.env.PORT;
const mongdb = process.env.MONGODB_URI;

require('dotenv').config();

app.start(port, mongdb);
