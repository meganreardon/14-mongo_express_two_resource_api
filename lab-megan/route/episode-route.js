'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Show = require('../model/show.js');

const episodeRouter = module.exports = new Router();

episodeRouter.post('/api/show/:showID/episode', jsonParser, function(req, res, next) {
  Show.findByIdAndAddEpisode(req.params.showID, req.body)
  .then( show => res.json(episode))
  .catch(next);
});
