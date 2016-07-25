//web node based on express

var https = require('https');
var express = require('express');
var session = require('express-session');
var redis_store = require('connect-redis')(session); //for session store
var redis = require('redis'); 
var redis_cli = redis.createClient({
	host: '127.0.0.1',
	port: 6379
});//redis client

//tools
var uuid = require('node-uuid');

var body_parser = require('body-parser');
var json_parser = body_parser.json();
var urlencoded_parser = body_parser.urlencoded({extended: true});

var uid_check = function(uid){
	var reg_mobil = new RegExp("^[0-9]*$");			
	var reg_email = new RegExp("[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,4}");

	if (uid == '') {
		return 0;
	}
	else if (reg_email.test(uid)){
		return 1;
	}
	else if (reg_mobil.test(uid)){
		return 2;
	}
	else {
		return -1;
	}	
};

var session_expr= 3600*1000*100;

var mapper = require('./mongo_mapper');

var app = express();

app.use('/', express.static('public')); //no need to require app.router prior to static router

app.use(session({
	store: new redis_store({
		client: redis_cli,
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

//sequential filter: check if session is disabled
app.use(function(req, res, next){
	if (!req.session){
		return next(new Error('session lost'));
	}
	next();
});

/*
 * RESTful APIs
 * user operation:
 * /user/signin 
 * /user/signup
 * /user/signout
 * /user/update_profile
 * nut operation:
 * /nut/list/10
 * /nut/create
 * /nut/delete/id
 * /nut/update
 * /nut/order/num
 */

var controller = require('./controller');
app.post('/user', json_parser, co
);

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
