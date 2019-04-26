const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/MoviePlace');

const db = mongoose.connection;