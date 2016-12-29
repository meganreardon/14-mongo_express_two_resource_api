'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const createError = require('http-errors');
const debug = require('debug')('episode:episode-router');

const Show = require('../model/show.js');
const Episode = require('../model/episode.js');
const episodeRouter = module.exports = new Router();

episodeRouter.post('/api/show/:showID/episode', jsonParser, function(req, res, next) {
  debug('POST: /api/show/:showID/episode');

  Show.findByIdAndAddEpisode(req.params.showID, req.body)
  .then( episode => res.json(episode))
  .catch(next);
});

episodeRouter.get('/api/episode/:id', function (req, res, next) {
  debug('GET: /api/episode/:id');

  Episode.findById(req.params.id)
  .then( episode => res.json(episode))
  .catch( err => next(createError(404, err.message)));
});

episodeRouter.put('/api/episode/:id', jsonParser, (req, res, next) => {
  debug('PUT /api/episode/:id');

  Episode.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(episode => res.json(episode))
  .catch( err => next(createError(404, err.message)));
});

episodeRouter.delete('/api/episode/:id', function(req, res, next) {
  debug('DELETE: /api/episode/:id');

  Episode.findByIdAndRemove(req.params.id)
  .then( () => res.status(204).send())
  .catch( err => next(createError(404, err.message)));
});
