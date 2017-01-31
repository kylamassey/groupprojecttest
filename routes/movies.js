var express = require('express');
var router = express.Router();
var models = require('../db/models/index');
/* GET movies page. */

// creates route to display all movies in movies database on the dom.
router.get('/', function(req, res, next) {
  models.Movie.findAll({}).then(function(movies) {
    res.render('movies', {
      title: 'Movies',
      movies: movies
    });
  });
});
// creates a page that allows user to add a movie to the database
router.get('/new', function(req, res, next) {
  res.render('new');
});

// creates route to movies/id# that renders movie titles and synopsis based on whichever movie id was requested
router.get('/:id', function(req, res, next) {
  models.Movie.findById(req.params.id).then(function(movies) {
    res.render('moviesHome', {
      title: movies.title,
      movies: movies,
      synopsis: movies.synopsis
    });
  });
});

// GET /movies/:id/edit: this should bring the user to a form to edit the info. of the movie corresponding to the id. Don't worry about allowing the user to edit the director for now, we can't be sure that whomever is in charge of that part of the app has completed their work
router.get('/:id/edit', function(req, res, next) {
  models.Movie.findById(req.params.id).then(function(movie) {
    res.render('moviesEdit', {
      movie:movie
    });
  });
});


router.put('/:id', function(req, res, next) {
  models.Movie.update({
    title: req.body.title,
    synopsis: req.body.synopsis
  }, { where: { id: req.params.id } })
  .then(function() {
    res.redirect('/movies/' + req.params.id);
  });
});






module.exports = router;
