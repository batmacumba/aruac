var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var infoSchema = new Schema({
      phone: String,
      facebook: String,
      instagram: String,
      youtube: String,
      email: String,
      story: String,
      story_en: String
  });

module.exports = mongoose.model('Info', infoSchema);
