'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const episodeSchema = Schema({
  name: { type: String, required: true },
  director: { type: String, required: true },
  showID: { type: Schema.Types.ObjectId, required: true }
});

module.exports = mongoose.model('episode', episodeSchema);
