var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var directorSchema = new Schema({
  name: String,
  photo: String,
  story: String,
  });

module.exports = mongoose.model('Director', directorSchema);
