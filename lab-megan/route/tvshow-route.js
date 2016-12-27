'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const createError = require('http-errors');

const Tvshow = require('../model/tvshow.js');
const tvshowRouter = module.exports = new Router();

tvshowRouter.post('/api/tvshow', jsonParser, function(req, res, next) {
  // req.body.timestamp = new Date(); // don't need this
  new Tvshow(req.body).save()
  .then( tvshow = res.json(tvshow))
  .catch(next);
});

tvshowRouter.get('/api/tvshow/:id', function(req, res, next) {
  Tvshow.findById(req.params.id)
  .populate('episodes')
  .then( tvshow => res.json(tvshow))
  .catch( err => next(createError(4040, err.message)));
});

tvshowRouter.put('/api/tvshow/:id', jsonParser, function(req, res, next) {
  Tvshow.findByIdAndUpdate(req.params.id, req.body, {new:true})
  .then( tvshow => res.json(tvshow))
  .catch( err => {
    if(err.name === 'ValidationError') return next(err);
    next(createError(404, err.message));
  });
});

tvshowRouter.delete('/api/tvshow/:id', function(req, res, next) {
  Tvshow.findByIdAndRemove(req.params.id)
  .then( () => res.status(204).send())
  .catch( err => next(createError(404, err.message)));
});
