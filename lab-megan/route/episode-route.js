'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('episode:episode-router');
const Show = require('../model/show.js');

const episodeRouter = module.exports = new Router();

episodeRouter.post('/api/show/:showID/episode', jsonParser, function(req, res, next) {
  debug('POST: /api/show/:showID/episode');
  Show.findByIdAndAddEpisode(req.params.showID, req.body)
  .then( episode => res.json(episode))
  .catch(next);
});
