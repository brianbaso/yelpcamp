var express 	= require('express'),
	app 		= express(),
	bodyParser 	= require('body-parser'),
	mongoose 	= require('mongoose')

// mongoose step 1. connect
mongoose.connect('mongodb://localhost/yelp_camp');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

// mongoose step 2. set up the schema
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String
});

// mongoose step 3. complile into a model
var Campground = mongoose.model("Campground", campgroundSchema);

Campground.create(
	{
		name: 'Salmon Creek',
		image: 'https://cascadiatents.com/wp-content/uploads/2016/08/CVT-Mt.-Rainier-EV-TN.jpg'

	}, function(err, campground) {
		if (err) {
			console.log(err);	
		} else {
			console.log('new camground');
			console.log(campground);
		}
	});

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