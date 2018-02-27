/*	RESTful Routes:
	name			url 					verb		desc.
	________________________________________________________________________

	1. INDEX		/campgrounds			GET 		display list of dogs
	2. NEW 			/campgrounds/new 		GET 		display form to make new dog
 	3. CREATE 		/campgrounds			POST 		add a new dog to DB
 	4. SHOW  		/campgrounds/:id  		GET 		shows info about one dog
 	
 	5. NEW 			campgrounds/:id/comments/new 		GET
 	6. CREATE 		campgrounds/:id/comments			POST
*/

var express 	= require('express'),
	app 		= express(),
	bodyParser 	= require('body-parser'),
	mongoose 	= require('mongoose'),
	Campground  = require('./models/campground'),
	seedDB		= require('./seeds');


// mongoose step 1. connect
mongoose.connect('mongodb://localhost/yelp_camp_v3');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
seedDB();

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
			res.render('campgrounds/index', {campgrounds: allCampgrounds});
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
	res.render('campgrounds/new');
});

// SHOW route: shows more info about one campground
app.get('/campgrounds/:id', function(req, res) {
	// find the campground with the provided ID
	Campground.findById(req.params.id).populate('comments').exec(function (err, foundCampground) {
		if (err) {
			console.log(err);
		} else {
			res.render('campgrounds/show', {campground: foundCampground});
		}
	});
});

// ===================
//  COMMENTS ROUTES
// ===================
app.get('/campgrounds/:id/comments/new', function(req, res) {
	res.render('comments/new');
});


app.listen(3000, function() {
	console.log('Server started...');
});