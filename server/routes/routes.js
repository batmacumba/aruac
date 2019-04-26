var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Project = require('../../models/Project');
var Info = require('../../models/Info');
var Director = require('../../models/Director');
var fs = require('fs');
var crypto = require('crypto');
var mv = require('mv');
var rimraf = require('rimraf');
var bcrypt = require("bcryptjs");
var User = require('../../models/User');
var jwt = require('jwt-simple');
var secret = 'FFek5VApTF6T1xPpH1mFMx6c7d20tJY7';

/*******************************************************************************
                                   GLOBAL
*******************************************************************************/
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

/*******************************************************************************
                                  PROJECTS
*******************************************************************************/

router.route('/insert')
.post(function(req, res) {
      var project = new Project();
      project.title = req.body.title;
      project.title_en = req.body.title_en;
      project.director = req.body.director.split(',');
      project.year = req.body.year;
      project.trailer = req.body.trailer;
      project.genre = req.body.genre;
      project.genre_en = req.body.genre_en;
      project.duration = req.body.duration;
      project.country = req.body.country;
      project.country_en = req.body.country_en;
      project.crew = JSON.parse(req.body.crew);
      project.crew_en = JSON.parse(req.body.crew_en);
      project.cast = req.body.cast.split(',');
      project.storyline = req.body.storyline;
      project.storyline_en = req.body.storyline_en;
      project.awards = req.body.awards;
      project.awards_en = req.body.awards_en;
      project.festivals = req.body.festivals;
      project.festivals_en = req.body.festivals_en;
      project.reviews = req.body.reviews.split(',');
      project.reviews_en = req.body.reviews_en.split(',');
      project.stills = req.body.stills;
      project.thumbnail = req.body.thumbnail;
      project.category = req.body.category;

      var tmpPath = './server/public/images/tmp/';
      var targetPath = './server/public/images/upload/projects/' + project.title + '/';
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
      project.title_en = req.body.title_en;
      project.director = req.body.director.split(',');
      project.year = req.body.year;
      project.trailer = req.body.trailer;
      project.genre = req.body.genre;
      project.genre_en = req.body.genre_en;
      project.duration = req.body.duration;
      project.country = req.body.country;
      project.country_en = req.body.country_en;
      project.crew = JSON.parse(req.body.crew);
      project.crew_en = JSON.parse(req.body.crew_en);
      project.cast = req.body.cast.split(',');
      project.storyline = req.body.storyline;
      project.storyline_en = req.body.storyline_en;
      project.awards = req.body.awards;
      project.awards_en = req.body.awards_en;
      project.festivals = req.body.festivals;
      project.festivals_en = req.body.festivals_en;
      project.reviews = req.body.reviews.split(',');
      project.reviews_en = req.body.reviews_en.split(',');
      project.stills = req.body.stills;
      project.thumbnail = req.body.thumbnail;
      project.category = req.body.category;

      var tmpPath = './server/public/images/tmp/';
      var targetPath = './server/public/images/upload/projects/' + project.title + '/';
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
  var dir = './server/public/images/upload/projects/' + req.body.title;
  rimraf(dir, function () { console.log('project folder deleted'); });
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
     info.story_en = req.body.story_en;

     Info.find(function (err, previous) {
         /* existing document */
         if (previous[0]) {
             info._id = previous[0]._id;
             Info.update({_id: info._id}, info, function(err, result) {
               if (err) res.send(err);
               else res.send('Informações atualizadas!');
             });
         }
         /* new document */
         else {
             info._id = null;
             info.save(function(err) {
               if (err) res.send(err);
               else res.send('Informações salvas!');
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

/*******************************************************************************
                                 DIRETORES
*******************************************************************************/

router.route('/newDirector')
.post(function(req, res) {
      var director = new Director();
      director.name = req.body.name;
      director.photo = req.body.photo;
      director.story = req.body.story;
      director.story_en = req.body.story_en;

      var tmpPath = './server/public/images/tmp/';
      var targetPath = './server/public/images/upload/directors/' + director.name + '/';
      /* moves files into permanent folders */
      if (director.photo) {
          mv(tmpPath + director.photo, targetPath + director.photo,
              {mkdirp: true}, function(err) {
          });
          // BUG: what happens if mv doesn't work? we're pointing at a null file
          director.photo = targetPath + director.photo;
      }
      /* tmp folder clean */
      rimraf('./server/public/images/tmp/*', function () { console.log('tmp clean'); });

      director.save(function(err) {
        if (err) res.send(err);
        else res.send('Director successfully added!');
      });
});

router.route('/editDirector')
.post(function(req, res) {
      var director = new Director();
      director._id = req.body._id;
      director.name = req.body.name;
      director.photo = req.body.photo;
      director.story = req.body.story;
      director.story_en = req.body.story_en;

      var tmpPath = './server/public/images/tmp/';
      var targetPath = './server/public/images/upload/directors/' + director.name + '/';
      /* moves files into permanent folders */
      if (director.photo) {
          mv(tmpPath + director.photo, targetPath + director.photo,
              {mkdirp: true}, function(err) {
          });
          // BUG: what happens if mv doesn't work? we're pointing at a null file
          director.photo = targetPath + director.photo;
      }
      /* tmp folder clean */
      rimraf('./server/public/images/tmp/*', function () { console.log('tmp clean'); });

      Director.update({_id: director._id}, director, function(err, result) {
        if (err) res.send(err);
        else res.send('Director successfully updated!');
      });
});

router.route('/delDirector')
.post(function(req, res) {
  var id = req.body._id;
  var dir = './server/public/images/upload/directors/' + req.body.name;
  rimraf(dir, function () { console.log('director folder deleted'); });
  Director.find({_id: id}).remove().exec(function(err, director) {
    if(err) res.send(err)
    res.send('Director successfully deleted!');
  })
});

router.get('/getDirectors',function(req, res) {
    Director.find(function(err, directors) {
        if (err) res.send(err);
        res.json(directors);
    });
});

/*******************************************************************************
                                AUTENTICAÇÃO
 *******************************************************************************/

router.route('/newUser')
.post(function(req, res) {
    var user = new User();
    user.username = req.body.username;
    user.password = bcrypt.hashSync(req.body.password, 10);

    user.save(function(err) {
        if (err) res.send('Houve algum problema, tente de novo.');
        else res.send('Usuário adicionado!');
    });
});

router.route('/logUser')
.post(function(req, res) {
    User.findOne({ username: req.body.username}, function(err, user) {
        if (err)   return res.send({ msg:'Houve algum problema, tente de novo.'});
        if (!user) return res.send({ msg:'Usuário não existe'});
        if(!bcrypt.compareSync(req.body.password, user.password))
                   return res.send({ msg:'Senha incorreta!'});

        var payload = { username: req.body.username };
        var jwt_token = jwt.encode(payload, secret);
        res.send({ msg:'OK',
                   token: jwt_token,
                 });
    });
});

router.route('/checkUser')
.post(function(req, res) {
    var decoded = jwt.decode(req.body.token, secret);
    var name = decoded.username;
      
    User.findOne({ username: name}, function(err, user) {
               if (err || !user) res.send('false');
               else res.send('OK');
    });
});

/******************************************************************************/

module.exports = router;
