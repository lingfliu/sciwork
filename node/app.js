/*the sciwork web node based on express
 * framework stack includes:
 * 1. express
 * 2. redis session store
 * 3. redis cache(TODO)
 * 4. mongodb mongoose
 * 5. REST api + static + redirect
 * 6. json parser by body-parser
 * 7. https (TODO)
 */

//N.B.: all variables in this script are global 
//TODO: var https = require('https');


/*session***************************************/
var session = require('express-session');

var redis_store = require('connect-redis')(session); //for session store
var redis = require('redis'); 
var redis_cli_session = redis.createClient({
	host: '127.0.0.1',
	port: 6379
});//redis sessionstore client
redis_cli_session.on('error', function(error){
	console.log(error);
});

/*
var redis_cli_cache = redis.createClient({
	host: '127.0.0.1', 
	port: 6379
});//redis cache client

redis_cli_cache.on('error', function(error){
	console.log(error);
});
*/

/*other global settings*********************/
var session_expire = 3600*1000*24*100; //expire after 100 days

/*express config****************************/
var express = require('express');
var app = express();

//session management
app.use(session({
	store: new redis_store({
		client: redis_cli_session,
	}),
	secret: 'adr1456sbc23b5',
	resave: false,
	saveUninitialized: true,
	cookie: {
		path: '/', 
		httpOnly: true,
		secure: false, //set true if force https connections
		maxAge: null
	}
}));

//session filter: check if session is disabled
app.use(function(req, res, next){
	if (!req.session){
		return next(new Error('session lost'));
	}
	next();
});


//static router
app.use('/', express.static('public')); //no need to require app.router prior to static router

/*
 * RESTful APIs
 * /user
 * /research
 */

var user_api = require('./api/user_api');

app.use('/user/v1', user);

//use json_parser for all post request
app.post('/', json_parser);


app.get('/signout', function(req, res){
	req.session.destroy(function(err){
		// cannot access session here
	});
	res.send('signout');
});
app.get('/', function(req, res){
	sess = req.session;
	if (!sess){
		res.send('no session');
	}
	else {
		/*mongoose test code
		var nut = mongodb_helper.create_nut({
			name: 'test',
			type: 'data',
			description: 'a short test of nut storage',
			quantity: 1,
			repos: 'http://www.163.com/', 
			belong: 'lingfliu'
		});

		nut.save(function(err){
			if (err){
				console.log('failed to save to db');
				return;
			}
			console.log('saved to db');
		});

		mongodb_helper.find_nut({name: 'test'}, function(err, nut){
			if (err) {
				return;
			}
			nut_this = nut;
			console.log(nut.description);
		});
		*/

		res.send('session id =' + sess.id + 'uid = ' + sess.uid);
	}
});

app.listen(8080);

/*
 * TODO: create http and https servers 
var https_server = https.createServer(credential, app);
https_server.listen(8080);
*/
