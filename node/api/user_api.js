
/*parser***************************************/
var body_parser = require('body-parser');
var json_parser = body_parser.json();

//var urlencoded_parser = body_parser.urlencoded({extended: true});
var user_dao = require('../dao/user_dao_mongo');
var user_api = Router();
	
//preprocessing for all request
/*
user_api.use(function timelog(req, res){
	console.log('Time:' + Date.now());
	next();
});
*/

user_api.post('signup', function(req, res){
	var username = req.body.username;
	var password = req.body.password; //TODO: encrypt of password
	var query_params = {
		'username': username,
		'password': password
	}
	user_dao.get(query_params, function(err, l_user){
	});
});

user_api.post('signin', function(req, res){
	var username = req.body.username;
	var password = req.body.password; //TODO: encrypt of password
	var query_params = {
		'username': username,
		'password': password
	}
	user_dao.get(query_params, function(err, l_user){
});

user_api.get('signout', function(req, res){
	req.session.destroy();
});

//update profile
user_api.post('profile', function(req, res){
	req.body.uid
	var txt = req.body.descrip;
});

//get profile
user_api.get('profile', function(req, res){
});

module.exports.user = function(req, res){
	var l_uid = req.body.uid;
	var l_email = req.body.email;
	var l_mobile = req.body.mobile;
	var l_pwd = req.body.pwd;
	var l_op = req.body.op;

	var email = '';
	var mobile = '';

	var query_params = null;

	if (l_email){
		query_params = {'email':l_email, 'pwd':l_pwd};
	}
	else if(l_mobile){
		query_params = {'mobile':l_mobile, 'pwd':l_pwd};
	}
	else {
		res.send(JSON.stringify({'err':'format'}));
		return;
	}

	console.log(query_params);

	if (l_op == 0) {//signup

		if (l_mobile){
			query_params = {'mobile':l_mobile};
		}
		else if (l_email){
			query_params = {'email':l_email};
		}

		console.log(query_params);
		dao.find_user(query_params, function(err, l_user){
			if (!err) {
				if (l_user){
					//if user exist, 
					console.log(JSON.stringify({err: 'taken'}));
					res.send(JSON.stringify({'err': 'taken'}));
				}
				else {
					query_params.uid = uuid.v1();
					console.log(query_params);
					var user = dao.create_user(query_params);
					user.save(function(err){
						if (err){
							res.send(JSON.stringify({'err':'err'}));
							return;
						}

						sess = req.session;
						if (sess){
							sess.uid = l_uid;
							req.session.cookie.expires = new Date(Date.now() + session_expr);
							req.session.cookie.maxAge = session_expr;
						}
						res.send(JSON.stringify({'uid' : user.uid}));
					});
				}
			}
			else{
				res.send(JSON.stringify({'err':'err'}));
			}
		});
	}
	else if (l_op == 1){ //signin
		dao.find_user(query_params, function(err, l_user){
			if (err) {
				res.send(JSON.stringify({'err':'err'}));
			}
			else {
				if (!l_user) {
					console.log('pwd error');
					res.send(JSON.stringify({'err': 'pwd'}));
				}
				else {
					console.log('signin');
					res.send(JSON.stringify({'uid': l_user.uid}));
				}
			}
		});
	}
	else if (l_op == 3){
		console.log('query user');
		if (l_mobile){
			query_params = {'mobile':l_mobile};
		}
		else if (l_email){
			query_params = {'email':l_email};
		}

		dao.find_user(query_params, function(err, l_user){
			if (err) {
				res.send(JSON.stringify({'err':'err'}));
			}
			else {
				console.log('user = ' + l_user);
				if (l_user){
					res.send(JSON.stringify({'usr': 'exist'}));
				}
				else {
					res.send(JSON.stringify({'usr': 'none'}));
				}
			}
		});
	}
}

module.exports = user_api;
