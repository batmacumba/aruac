var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var sessionSchema = new Schema({
  username: String,
  token: String,
  date: String
});

module.exports = mongoose.model('Session', sessionSchema);
