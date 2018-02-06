var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

var campgrounds = [
	{name: 'Salmon Creek', image: 'https://cdn.pixabay.com/photo/2014/05/03/00/42/vw-camper-336606__480.jpg'},
	{name: 'Granite Hill', image: 'https://cdn.pixabay.com/photo/2015/07/10/17/24/night-839807__480.jpg'},
	{name: 'Mountain Goat\'s Rest', image: 'https://cdn.pixabay.com/photo/2018/02/02/13/37/nature-3125452__480.jpg'}
]

app.get('/', function(req, res) {
	res.render('landing');
});

app.get('/campgrounds', function(req, res) {
	// second arguement is data that we want to pass through to webpage
	res.render('campgrounds', {campgrounds: campgrounds});
});

app.post('/campgrounds', function(req, res) {
	// get data from form, add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image: image}
	campgrounds.push(newCampground);
	
	// redirect back to campgrounds page
	res.redirect('/campgrounds');

});

app.get('/campgrounds/new', function(req, res) {
	res.render('new');
});

app.listen(3000, function() {
	console.log('Server started...');
});