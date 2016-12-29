'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
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


// below were my original trys
// episodeRouter.get('/api/show/:showID/episode', function(req, res, next) {
//   debug('GET: /api/show/:showID/episode');
//
//   Show.findById(req.params.showID, req.body)
//   .then( episode => res.json(episode))
//   .catch(next);
// });
//
// episodeRouter.put('/api/show/:showID/episode', jsonParser, function(req, res, next) {
//   debug('PUT: /api/show/:showID/episode');
//
//   // Show.findByIdAndUpdate(req.params.id, req.body, {new:true})
//   Episode.findByIdAndUpdate(req.params.id, req.body, {new:true})
//   .then( episode => res.json(episode))
//   .catch(next);
// });
