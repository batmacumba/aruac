//server/server.js
var express = require('express');
var router = require('./routes/routes.js')
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var fileUpload = require('express-fileupload');
var cors = require('cors');

app.use(express.static(path.join(__dirname, '../client/public/')));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));
app.use(cors());
app.use(fileUpload());
app.use('/', router);
app.use(express.static('./'));

app.use('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '/../client/public/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

mongoose.connect('mongodb://localhost/myapp');

module.exports=app;
