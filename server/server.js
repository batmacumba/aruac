//server/server.js
var express = require('express');
var router = require('./routes/routes.js')
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var fileUpload = require('express-fileupload');
var cors = require('cors');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../client'));
app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));
app.use(cors());
app.use(fileUpload());
app.use('/', router);
app.use(express.static('./'));

mongoose.connect('mongodb://localhost/myapp');

module.exports=app;
