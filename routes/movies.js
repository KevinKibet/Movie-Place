const MoviesModel = require('../models/movie.js');
const express = require('express');
const router = express.Router();

 router.get('/', (req, res)=>{

MoviesModel.find({}, (err, movies)=>{
  if(err){
  	res.send(err);
  }

  res.render('movie', { movie : movies} );

})
    

 } )


 module.exports = router;