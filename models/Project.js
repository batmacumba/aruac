//models/Project.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var projectSchema = new Schema({
                               title: String,
                               genre: String,
                               year: Number
                               });
module.exports = mongoose.model('Project', projectSchema);
