'use strict';

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const Promise = require('bluebird');
const debug = require('debug')('episodes:server');

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/episodes';

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

const app  = express();
app.use(cors());
app.use(morgan('dev'));

app.listen(PORT, () => {
  debug(`server up at: ${PORT}`);
});
