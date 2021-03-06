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
          //res.render('addmovies',{errors: errors});
          console.log(errors)
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



 //Details page

 router.get('/details/:id', (req, res)=>{

MoviesModel.find({_id:req.params.id}, (err, movies)=>{
  if(err){
  	res.send(err);
  }

  res.render('details', { movie : movies} );

})
    

 } )

 //Deleting a movie
 router.delete('/delete/:id', (req,res)=>{

 	MoviesModel.remove({_id: req.params.id}, function(err){
 		if(err){
 			res.send(err);
 		}
 		res.status(204).send();
 	})
 })

//edit a movie

router.get('/edit/:id', (req, res)=>{

MoviesModel.find({_id:req.params.id}, (err, movies)=>{
  if(err){
  	res.send(err);
  }

  res.render('edit', { movie : movies} );

})

 } )


// Update Movie POST
    router.post('/edit/:id', function(req, res){
        req.checkBody('title','Title is required').notEmpty();

        var errors = req.validationErrors();

        if(errors){
          MoviesModel.find({_id: req.params.id}, function(err, movie){
            if(err){
              res.send(err);
            }
            res.render('edit', {errors:errors,movie: movie});
          });
        } else {
          var title = req.body.title && req.body.title.trim();
          var release_date = req.body.release_date && req.body.release_date.trim();
          var genre = req.body.genre && req.body.genre.trim();
          var director = req.body.director && req.body.director.trim();
          var plot = req.body.plot && req.body.plot.trim();
          var trailer= req.body.trailer && req.body.trailer.trim();
          var cover = req.body.cover && req.body.cover.trim();

          var updMovie = {
            title: title,
            release_date: release_date,
            genre: genre,
            director: director,
            plot: plot,
            cover: cover,
            trailer: trailer
          };

          MoviesModel.update({_id:req.params.id}, updMovie, function(err){
            if(err){
              res.send(err);
            }
          return  res.redirect('/movies');
          });
        }
    });




    // Search movies
    router.post('/search', function(req, res){
        MoviesModel.search(req.body.searchText, {title: 1, plot: 1, cover: 1},{
          conditions: {title:{$exists: true}, plot: {$exists: true}, cover:{$exists: true}},
          sort: {title: 1},
          limit: 10
        }, function(err, movies){
          if(err){
            res.send(err);
          }
          var model = {
            movie: movies.results
          }
          res.render('movie', model);
        });
    });

    // Filter genre
  router.get('/genre/:genre', function (req, res) {
        MoviesModel.find({genre:req.params.genre}, function(err, movies){
            if(err){
                res.send(err);
            }

            var model = {
                movie: movies
            }

           res.render('movie', model);
        });
    });


 module.exports = router;