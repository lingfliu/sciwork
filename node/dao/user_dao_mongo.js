var mongoose = require('mongoose');

var helper = require('./mongo_helper');
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

module.exports.create_user = function(username, password){
	var params = {
		'username': username,
		'password': password
	}

	var user = helper.create(user, User);
	if (user){
	}
	else {
	}
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
