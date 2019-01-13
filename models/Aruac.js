//models/Aruac.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var projectSchema = new Schema({
  phone: String,
  facebook: [String],
  instagram: String,
  email: String,
  stills: [String],
  story: String,
  });

module.exports = mongoose.model('Aruac', aruacSchema);
