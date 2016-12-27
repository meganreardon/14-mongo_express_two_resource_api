'use strict';

const mongoose = require('mongoose');
const createError = require('http-errors');
const debug = require('debug')('episode:show');
const Schema = mongoose.Schema;

const Episode = require('./episode.js');

const showSchema = Schema({
  title: { type: String, required: true },
  startDate: { type: Date, required: true },
  episodes: [{ type: Schema.Types.ObjectId, ref: 'episode' }]
});

const Show = module.exports = mongoose.model('show', showSchema);

Show.findByIdAndAddEpisode = function(id, episode) {
  debug('findByIdAndAddEpisode');

  return Show.findById(id)
  .catch( err => Promise.reject(createError(404, err.message)))
  .then( show => {
    episode.showID = show._id;
    this.tempShow = show;
    return new Episode(episode).save();
  })
  .then( episode => {
    this.tempShow.episodes.push(episode._id);
    this.tempEpisode = episode;
    return this.tempShow.save();
  })
  .then ( () => {
    return this.tempEpisode;
  });

};
