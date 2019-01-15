var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Project = require('../../models/Project');
var Info = require('../../models/Info');
var fs = require('fs');
var crypto = require('crypto');
var mv = require('mv');
var rimraf = require('rimraf');

/*******************************************************************************
                                  PROJECTS
*******************************************************************************/

router.route('/insert')
.post(function(req, res) {
      var project = new Project();
      project.title = req.body.title;
      project.director = req.body.director.split(',');
      project.year = req.body.year;
      project.trailer = req.body.trailer;
      project.genre = req.body.genre;
      project.duration = req.body.duration;
      project.country = req.body.country;
      project.crew = req.body.crew;
      project.cast = req.body.cast.split(',');
      project.storyline = req.body.storyline;
      project.awards = req.body.awards;
      project.festivals = req.body.festivals;
      project.reviews = req.body.reviews.split(',');
      project.stills = req.body.stills;
      project.thumbnail = req.body.thumbnail;
      project.category = req.body.category;

      var tmpPath = './server/public/images/tmp/';
      var targetPath = './server/public/images/upload/' + project._id + '/';
      /* moves files into permanent folders */
      if (project.stills && project.stills.length > 0) {
          for (var i = 0; i < project.stills.length; i++) {
              mv(tmpPath + project.stills[i], targetPath + project.stills[i],
                  {mkdirp: true}, function(err) {
              });
              // BUG: what happens if mv doesn't work? we're pointing at a null file
              project.stills[i] = targetPath + project.stills[i];
          }
      }
      if (project.thumbnail) {
          mv(tmpPath + project.thumbnail, targetPath + project.thumbnail,
              {mkdirp: true}, function(err) {
          });
          // BUG: what happens if mv doesn't work? we're pointing at a null file
          project.thumbnail = targetPath + project.thumbnail;
      }
      /* tmp folder clean */
      rimraf('./server/public/images/tmp/*', function () { console.log('tmp clean'); });

      project.save(function(err) {
        if (err) res.send(err);
        else res.send('Project successfully added!');
      });
});

router.route('/update')
.post(function(req, res) {
      var project = new Project();
      project._id = req.body._id;
      project.title = req.body.title;
      project.director = req.body.director.split(',');
      project.year = req.body.year;
      project.trailer = req.body.trailer;
      project.genre = req.body.genre;
      project.duration = req.body.duration;
      project.country = req.body.country;
      project.crew = req.body.crew;
      project.cast = req.body.cast.split(',');
      project.storyline = req.body.storyline;
      project.awards = req.body.awards;
      project.festivals = req.body.festivals;
      project.reviews = req.body.reviews.split(',');
      project.stills = req.body.stills;
      project.thumbnail = req.body.thumbnail;
      project.category = req.body.category;

      var tmpPath = './server/public/images/tmp/';
      var targetPath = './server/public/images/upload/' + project._id + '/';
      /* moves files into permanent folders */
      if (project.stills && project.stills.length > 0) {
          for (var i = 0; i < project.stills.length; i++) {
              mv(tmpPath + project.stills[i], targetPath + project.stills[i],
                  {mkdirp: true}, function(err) {
              });
              // BUG: what happens if mv doesn't work? we're pointing at a null file
              project.stills[i] = targetPath + project.stills[i];
          }
      }
      if (project.thumbnail) {
          mv(tmpPath + project.thumbnail, targetPath + project.thumbnail,
              {mkdirp: true}, function(err) {
          });
          // BUG: what happens if mv doesn't work? we're pointing at a null file
          project.thumbnail = targetPath + project.thumbnail;
      }
      /* tmp folder clean */
      rimraf('./server/public/images/tmp/*', function () { console.log('tmp clean'); });

      Project.update({_id: req.body._id}, project, function(err, result) {
        if (err) res.send(err);
        else res.send('Project successfully updated!');
      });

      });

router.route('/delete')
.post(function(req, res) {
  var id = req.body._id;
  var dir = './server/public/images/upload/' + id + '/';
  // TODO: deletar diretório
  Project.find({_id: id}).remove().exec(function(err, project) {
    if(err) res.send(err)
    res.send('Project successfully deleted!');
  })
});

router.get('/getAll',function(req, res) {
           Project.find(function(err, projects) {
                        if (err)
                            res.send(err);
                        res.json(projects);
                        });
           });

/*******************************************************************************
                                   INFO
*******************************************************************************/

router.route('/updateInfo')
.post(function(req, res) {
     var info = new Info();
     info.phone = req.body.phone;
     info.facebook = req.body.facebook;
     info.instagram = req.body.instagram;
     info.youtube = req.body.youtube;
     info.email = req.body.email;
     info.story = req.body.story;

     Info.find(function (err, previous) {
         /* existing document */
         if (previous[0]) {
             info._id = previous[0]._id;
             Info.update({_id: info._id}, info, function(err, result) {
               if (err) res.send(err);
               else res.send('Info successfully updated!');
             });
         }
         /* new document */
         else {
             info._id = null;
             info.save(function(err) {
               if (err) res.send(err);
               else res.send('Info successfully saved!');
               console.log(err);
             });
         }
     });
});

router.get('/getInfo',function(req, res) {
          Info.find(function(err, infos) {
                       if (err) res.send(err);
                       res.json(infos[0]);
                       });
          });

router.route('/upload')
.post(function(req, res) {
    var path = './server/public/images/tmp/' + req.files.filepond.name;
    req.files.filepond.mv(path,
        function(err) {
            if (err) {
                return res.status(500).send(err)
            }
            res.format ({
                'text/plain': function() {
                    res.send(path);
                }});
            })
});

/******************************************************************************/

module.exports = router;
