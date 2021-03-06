var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');
// INDEX route: show all campgrounds
router.get('/campgrounds', function(req, res) {
	// Get all campgrounds from db
	Campground.find({}, function(err, allCampgrounds) {
		if (err) {
			console.log(err);
		} else {
			// data that we pass through to the webpage
			res.render('campgrounds/index', {campgrounds: allCampgrounds, currentUser: req.user});
		}
	});
});

// CREATE route: add new campground to database
router.post('/campgrounds', isLoggedIn, function(req, res) {
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
router.get('/campgrounds/new', isLoggedIn, function(req, res) {
	res.render('campgrounds/new');
});

// SHOW route: shows more info about one campground
router.get('/campgrounds/:id', function(req, res) {
	// find the campground with the provided ID
	Campground.findById(req.params.id).populate('comments').exec(function (err, foundCampground) {
		if (err) {
			console.log(err);
		} else {
			res.render('campgrounds/show', {campground: foundCampground});
		}
	});
});

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/login');
}

module.exports = router;
