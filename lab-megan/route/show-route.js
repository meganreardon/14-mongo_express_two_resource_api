'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const createError = require('http-errors');
const debug = require('debug')('show:show-router'); // TODO is this right??

const Show = require('../model/show.js');
const showRouter = module.exports = new Router();

showRouter.post('/api/show', jsonParser, function(req, res, next) {
  debug('POST: /api/show');
  // req.body.startDate = new Date(); // don't need this
  new Show(req.body).save()
  .then( show => res.json(show))
  .catch(next);
});

showRouter.get('/api/show/:id', function(req, res, next) {
  debug('GET: /api/show/:id');
  Show.findById(req.params.id)
  .populate('episodes')
  .then( show => res.json(show))
  .catch( err => next(createError(404, err.message)));
});

showRouter.put('/api/show/:id', jsonParser, function(req, res, next) {
  debug('PUT: /api/show/:id');
  Show.findByIdAndUpdate(req.params.id, req.body, { new: true })
  .then( show => res.json(show))
  .catch( err => {
    if(err.name === 'ValidationError') return next(err);
    next(createError(404, err.message));
  });
});

showRouter.delete('/api/show/:id', function(req, res, next) {
  debug('DELETE: /api/show/:id');
  Show.findByIdAndRemove(req.params.id)
  .then( () => res.status(204).send())
  .catch( err => next(createError(404, err.message)));
});
