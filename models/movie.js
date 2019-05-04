const mongoose = require('mongoose');
const searchPlugin = require('mongoose-search-plugin');

const MoviesSchema = mongoose.Schema({
	title: String,
	genre: String,
	plot: String,
	director: String,
	trailer: String,
	cover: String
});

MoviesSchema.plugin(searchPlugin, {
    fields: ['title', 'plot', 'cover']
  });

const Movies= mongoose.model('Movies', MoviesSchema);

module.exports = Movies;