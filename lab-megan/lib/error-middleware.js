'use strict';

const createError = require('http-errors');
const debug = require('debug')('episode:error-midddleware');

module.exports = function(err, req, res, next) {
  debug('error middleware');

  console.error('msg:', err.message);
  console.error('name:', err.name);
  // console.log('::: whole damn err is:', err);

  if(err.status) {

    res.status(err.status).send(err.name);
    next();
    return;
  }

  if (err.name === 'ValidationError') {
    console.log('::: ERROR MIDDLEWARE page inside the validation error block');
    err = createError(400, err.message);
    res.status(err.status).send(err.name);
    next();
    return;
  }

  err = createError(500, err.message);
  res.status(err.status).send(err.name);
  next();

};
