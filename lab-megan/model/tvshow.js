'use strict';

const mongoose = require('mongoose');
const createError = require('http-errors');
const debug = require('debug')('episode:tvshow');
const Schema = mongoose.Schema;

const Episode = require('./episode.js');

const tvshowSchema = Schema({
  title: { type: String, required: true },
  startDate: { type: Date, required: true },
  episodes: [{ type: Schema.Types.ObjectId, ref: 'episode' }]
});

const Tvshow = module.exports = mongoose.model('tvshow', tvshowSchema);

Tvshow.findByIdAndAddEpisode = function(id, episode) {
  debug('findByIdAndAddEpisode');

  return Tvshow.findById(id)
  .catch( err => Promise.reject(createError(404, err.message)))
  .then( tvshow => {
    episode.tvshowID = tvshow._id;
    this.tempTvshow = tvshow;
    return new Episode(episode).save();
  })
  .then( episode => {
    this.tempTvshow.episodes.push(episode._id);
    this.tempEpisode = episode;
    return this.tempTvshow.save();
  })
  .then ( () => {
    return this.tempEpisode;
  });

};
