const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//const db = require('./lib/db');  
const expressValidator = require('express-validator');
const config = require('config');
//port
const PORT =3000;
const dbSr= config.get('db');
// Mongoose Connect
//mongoose.connect('mongodb://localhost/MoviePlaceL');
mongoose.connect(config.get('db')).then(()=>{
	console.log(`connected to ${dbSr}`)
});
const db = mongoose.connection;

//initialise the app
const app = new express();

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '/public')));


const movie = require('./routes/movies');

// View Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// Express validator middleware
app.use(expressValidator({
  errorFormatter: (param, msg, value) => {
      const namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));



app.use('/movies', movie);

const server = app.listen(PORT, ()=>{
	console.log('Server Listening on port '+PORT+'...')
})

module.exports = server;