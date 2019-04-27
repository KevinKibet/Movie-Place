const MoviesModel = require('../models/movie.js');
const express = require('express');
const router = express.Router();




// movie listing
 router.get('/', (req, res)=>{

MoviesModel.find({}, (err, movies)=>{
  if(err){
  	res.send(err);
  }

  res.render('movie', { movie : movies} );

})
    

 } )

 //add movie form
 router.get('/add', (req,res)=>{
  res.render('addmovies');

 })

 //adding movies POST

 router.post('/add', (req, res)=>{
    req.checkBody('title','Title is required').notEmpty();
    var errors = req.validationErrors();
    if(errors){
          res.render('addmovies',{errors: errors});
        } else {
          var title = req.body.title && req.body.title.trim();
          var release_date = req.body.release_date && req.body.release_date.trim();
          var genre = req.body.genre && req.body.genre.trim();
          var director = req.body.director && req.body.director.trim();
          var plot = req.body.plot && req.body.plot.trim();
          var trailer= req.body.trailer && req.body.trailer.trim();
          var cover = req.body.cover && req.body.cover.trim();
      }

      const newMovie = new MoviesModel({

         	title: title,
            release_date: release_date,
            genre: genre,
            director: director,
            plot: plot,
            cover: cover,
            trailer: trailer
      })


      newMovie.save((err)=>{
      	if(err){
      		res.send(err);
      	}else{
      		return res.redirect('/movies')
      	}
      })

 });


 module.exports = router;