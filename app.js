const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

//port
const PORT =3000;

//initialise the app
const app = new express();

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));




// View Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/movie', (req,res)=>{
	res.render('movie');
})

app.listen(PORT, ()=>{
	console.log('Server Listening on port '+PORT+'...')
})