//models/Director.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var projectSchema = new Schema({
  name: String,
  photos: [String],
  story: String,
  });

module.exports = mongoose.model('Director', directorSchema);
