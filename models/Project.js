//models/Project.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var projectSchema = new Schema({
  title: String,
  director: [String],
  year: String,
  trailer: String,
  stills: [String],
  thumbnail: String,
  genre: String,
  duration: String,
  country: [String],
  crew: [String],
  cast: [String],
  storyline: String,
  awards: [String],
  festivals: [String],
  reviews: [String],
  category: String
  });

module.exports = mongoose.model('Project', projectSchema);
