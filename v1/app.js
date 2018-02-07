var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

var campgrounds = [
	{name: 'Salmon Creek', image: 'https://cascadiatents.com/wp-content/uploads/2016/08/CVT-Mt.-Rainier-EV-TN.jpg'},
	{name: 'Granite Hill', image: 'https://cascadiatents.com/wp-content/uploads/2016/08/CVT-Mt.-Rainier-EV-TN.jpg'},
	{name: 'Mountain Goat\'s Rest', image: 'https://cascadiatents.com/wp-content/uploads/2016/08/CVT-Mt.-Rainier-EV-TN.jpg'},
	{name: 'Salmon Creek', image: 'https://cascadiatents.com/wp-content/uploads/2016/08/CVT-Mt.-Rainier-EV-TN.jpg'},
	{name: 'Granite Hill', image: 'https://cascadiatents.com/wp-content/uploads/2016/08/CVT-Mt.-Rainier-EV-TN.jpg'},
	{name: 'Mountain Goat\'s Rest', image: 'https://cascadiatents.com/wp-content/uploads/2016/08/CVT-Mt.-Rainier-EV-TN.jpg'},
	{name: 'Salmon Creek', image: 'https://cascadiatents.com/wp-content/uploads/2016/08/CVT-Mt.-Rainier-EV-TN.jpg'},
	{name: 'Granite Hill', image: 'https://cascadiatents.com/wp-content/uploads/2016/08/CVT-Mt.-Rainier-EV-TN.jpg'},
	{name: 'Mountain Goat\'s Rest', image: 'https://cascadiatents.com/wp-content/uploads/2016/08/CVT-Mt.-Rainier-EV-TN.jpg'}
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