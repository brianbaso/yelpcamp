/*	RESTful Routes:
	name			url 					verb		desc.
	________________________________________________________________________

	1. INDEX		/campgrounds			GET 		display list of campgrounds
	2. NEW 			/campgrounds/new 		GET 		display form to make new campground
 	3. CREATE 		/campgrounds			POST 		add a new campground to DB
 	4. SHOW  		/campgrounds/:id  		GET 		shows info about one campground
 	
 	5. NEW 			campgrounds/:id/comments/new 		GET
 	6. CREATE 		campgrounds/:id/comments			POST
*/

var express 	= require('express'),
	app 		= express(),
	bodyParser 	= require('body-parser'),
	mongoose 	= require('mongoose'),
	Campground  = require('./models/campground'),
	Comment 	= require('./models/comment'),
	seedDB		= require('./seeds');


// mongoose step 1. connect
mongoose.connect('mongodb://localhost/yelp_camp_v3');

// config body parser
app.use(bodyParser.urlencoded({extended: true}));
// make ejs shortcut
app.set('view engine', 'ejs');
// add stylesheet
app.use(express.static(__dirname + "/public"))
// add some dummy data
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
	// express request objects
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
	// Find campground by id
	Campground.findById(req.params.id, function(err, campground) {
		if (err) {
			console.log(err);
		} else {
			res.render('comments/new', {campground: campground});
		}
	})
});

app.post('/campgrounds/:id/comments', function(req, res) {
	// Lookup campground using ID (inside req.params.id)
	Campground.findById(req.params.id, function(err, campground) {
		if (err) {
			console.log(err);
			res.redirect('/campgrounds');
		} else {
			Comment.create(req.body.comment, function(err, comment) {
				if (err) {
					console.log(err);
				} else {
					campground.comments.push(comment);
					campground.save();
					res.redirect('/campgrounds/' + campground._id);
				}
			});
		}
	})
});


app.listen(3000, function() {
	console.log('Server started...');
});