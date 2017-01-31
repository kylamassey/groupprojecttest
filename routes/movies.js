var express = require('express');
var router = express.Router();
var models = require('../db/models/index');
/* GET movies page. */

router.get('/', function(req, res, next) {
  models.Movie.findAll({}).then(function(movies) {
    res.render('movies', {
      title: 'Movies',
      movies: movies
    });
  });
});

router.get('/:id', function(req, res, next) {
  models.Movie.findById(req.params.id).then(function(movies) {
    res.render('moviesHome', {
      title: movies.title,
      movies: movies,
      about: movies.synopsis
    });
  });
});


// router.get('/new', function(req, res, next) {
//   res.render('movies/new');
// });

// render.post('/', function(req, res, next) {
//   models.Movie.create({
//     id: req.body.id,
//     title: req.body.title,
//     synopsis: req.body.synopsis,
//     director_id: req.body.director_id
//   }).then(function() {
//     res.redirect('/movies')
//   });
// });



module.exports = router;
