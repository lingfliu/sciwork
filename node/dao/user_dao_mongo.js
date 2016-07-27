var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/sci');

var Schema = mongoose.Schema;

var user_schema = new Schema({
	uid: String,
	pwd: String, //password
	name: String,
	title: String,
	email: String,
	tel: String,
	mobile: String,
	contacts: [String], //other contacts: weixin, linkedin, facebook
	belongs: [String], //belonged group & lab
	involves: [{ //involved 
		name: String, //project names
		role: String
	}],
});

var User = mongoose.model('User', user_schema);

module.exports.create_user = function(params, handle){
	var user = new User(params);
	user.save(function(err){
		if (err){
			return('err');
		}
		else {
			return(user.uid);
		}
	});
}

module.exports.find_user = function(params, handle){
	var user = User.findOne(params, function(err, user){
	});
}

module.exports.update_user = function(params){
	User.findOne(params, function(err, user){
	});
}

var delete_user = function(params){
	User.remove(params, function(err, user)){
	}
}
