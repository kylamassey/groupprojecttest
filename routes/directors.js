var express = require('express');
var router = express.Router();
var models = require('../db/models/index');
var authHelpers = require('../auth/auth-helpers');

/* GET directors page. */
// router.get('/', function(req, res, next) {
//   res.render('directors', { title: 'Directors' });
// });

//RENDER inside directors the names
router.get('/', authHelpers.loginRequired, function(req, res, next) {
  models.Director.findAll({}).then(function(directors) {
    res.render('directors', {
       title: 'Directors',
       directors: directors
     });
   });
 });

 /* GET new listing. */
 router.get('/new', authHelpers.loginRequired, function(req, res, next) {
   res.render('newDirector', { title: 'new' });
 });

//SELECT
// Render the name of the director id
router.get('/:id', authHelpers.loginRequired, function(req, res, next) {
  models.Director.findById(req.params.id).then(function(directors) {
    res.render('show', { directors: directors });
  });
});

router.post('/', authHelpers.loginRequired, function(req, res, next) {
  models.Director.create({
    name: req.body.name,
  }).then(function() {
    res.redirect('/directors')
  });
});

//EDIT
router.get('/:id/edit', authHelpers.loginRequired, function(req, res, next) {
  models.Director.findById(req.params.id).then(function(directors) {
    res.render('edit', { directors: directors });
  });
});

router.put('/:id', authHelpers.loginRequired, function(req, res, next) {
   models.Director.update({
       name: req.body.name
   }, { where: { id: req.params.id } }).then(function() {
       res.redirect('/directors/' + req.params.id);
   });
});

module.exports = router;
