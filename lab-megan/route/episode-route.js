'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Tvshow = require('../model/tvshow.js');

const episodeRouter = module.exports = new Router();

episodeRouter.post('/api/tvshow/:tvshowID/episode', jsonParser, function(req, res, next) {
  Tvshow.findByIdAndAddEpisode(req.params.tvshowID, req.body)
  .then( tvshow => res.json(episode))
  .catch(next);
});
