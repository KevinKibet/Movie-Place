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


 module.exports = router;