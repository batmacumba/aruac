//models/Project.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var crewSchema = mongoose.Schema({
    role: String,
    name: String
},{ _id : false });

var projectSchema = new Schema({
  title: String,
  title_en: String,
  director: [String],
  year: String,
  trailer: String,
  stills: [String],
  thumbnail: String,
  genre: String,
  genre_en: String,
  duration: String,
  country: [String],
  country_en: [String],
  crew: [crewSchema],
  crew_en: [crewSchema],
  cast: [String],
  storyline: String,
  storyline_en: String,
  awards: [String],
  awards_en: [String],
  festivals: [String],
  festivals_en: [String],
  reviews: [String],
  reviews_en: [String],
  category: String
  });

module.exports = mongoose.model('Project', projectSchema);
