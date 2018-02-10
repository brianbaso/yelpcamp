/*	RESTful Routes:
	name			url 			verb		desc.
	________________________________________________________________________

	1. INDEX		/dogs			GET 		display list of dogs
	2. NEW 			/dogs/new 		GET 		display form to make new dog
 	3. CREATE 		/dogs			POST 		add a new dog to DB
 	4. SHOW  		/dogs/:id  		GET 		shows info about one dog
 	5. 	
*/

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
	image: String,
	description: String
});

// mongoose step 3. complile into a model
var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
// 	{
// 		name: 'Granite Hill',
// 		image: 'https://cascadiatents.com/wp-content/uploads/2016/08/CVT-Mt.-Rainier-EV-TN.jpg',
// 		description: 'this is a huge granite hill, no bathrooms, no water, beautiful granite'

// 	}, function(err, campground) {
// 		if (err) {
// 			console.log(err);	
// 		} else {
// 			console.log('new camground');
// 			console.log(campground);
// 		}
// 	});

app.get('/', function(req, res) {
	res.render('landing');
});

// INDEX route: show all campgrounds
app.get('/campgrounds', function(req, res) {
	// Get all campgrounds from db
	Campground.find({}, function(err, allCampgrounds) {
		if (err) {
			console.log(err);
		} else {
			// data that we pass through to the webpage
			res.render('index', {campgrounds: allCampgrounds});
		}
	});
});

// CREATE route: add new campground to database
app.post('/campgrounds', function(req, res) {
	// get data from form, add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;

	var newCampground = {name: name, image: image, description: desc}
	
	// create a new campground and save it to the db
	Campground.create(newCampground, function (err, newlyCreated) {
		if (err) {
			console.log(err);
		} else {
			// redirect to campgrounds page
			res.redirect('/campgrounds');
		}
	});
});

// NEW route: show form to create new campground
app.get('/campgrounds/new', function(req, res) {
	res.render('new');
});

// SHOW route: shows more info about one campground
app.get('/campgrounds/:id', function(req, res) {
	// find the campground with the provided ID
	Campground.findById(req.params.id, function (err, foundCampground) {
		if (err) {
			console.log(err);
		} else {
			res.render('show', {campground: foundCampground});
		}
	});
});

app.listen(3000, function() {
	console.log('Server started...');
});