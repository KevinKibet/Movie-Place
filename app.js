const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./lib/db');  

//port
const PORT =3000;

//initialise the app
const app = new express();

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));


const movie = require('./routes/movies');

// View Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', movie);

app.listen(PORT, ()=>{
	console.log('Server Listening on port '+PORT+'...')
})