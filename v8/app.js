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
	passport        = require('passport'),
	LocalStrategy   = require('passport-local'),
	Campground      = require('./models/campground'),
	Comment 	= require('./models/comment'),
	User		= require('./models/user'),
	seedDB		= require('./seeds')

var commentRoutes = require('./routes/comments'),
    campgroundRoutes = require('./routes/campgrounds'),
    indexRoutes  = require('./routes/index')

// mongoose step 1. connect
mongoose.connect('mongodb://localhost/yelp_camp_v3');

// config body parser
app.use(bodyParser.urlencoded({extended: true}));
// make ejs shortcut
app.set('view engine', 'ejs');
// add stylesheet
app.use(express.static(__dirname + "/public"))
// add some dummy data
//seedDB();

// PASSPORT CONFIG
app.use(require('express-session')({
	secret: 'Rusty wins, I guess',
	resave: false,
	saveUnitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	next();
});

app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);

app.listen(3000, function() {
	console.log('Server started...');
});
