const mongoose = require('mongoose');


const MoviesSchema = mongoose.Schema({
	title: String,
	genre: String,
	plot: String,
	director: String,
	trailer: String,
	cover: String
});

const Movies= mongoose.model('Movies', MoviesSchema);

module.exports = Movies;