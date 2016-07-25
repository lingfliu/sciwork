var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/sci');
var Schema = mongoose.Schema;


/*
var lab_schema = new Schema({
	name: String,
	belong: String, //belonging name
	lab_name: String,
	fields: [String], //field tags
	groups: [String], //group name
	admin_user: String,  //man in charge
	addr: String,
	tel: String
});


var Lab = mongoose.model('Lab', lab_schema);
module.export.new_lab(){
	return new Lab;
}

var group_schema = new Schema({
	name: String,
	belong: String, //lab belonging
	description: String,
	member: [String],
	projects: [String]
});

var Group = mongoose.model('Group', group_schema);
module.export.new_group(){
	return new Group;
}


var project_schema = new Schema({
	name: String,
	description: String,
	start: Date,
	finish: Date,
	members: [Sring], //true name
	milestones: [String]
});

var Project = mongoose.model('Project', project_schema);
module.export.new_project(){
	return new Group;
}

var milestone_schema = new Schema({
	name: String,
	belong: String, //project belonging
	description: String,
	date: Date,
});

var Milestone = mongoose.model('Milestone', milestone_schema);
module.export.new_milestone(){
	return new Milestone;
}
*/

var nut_schema = new Schema({
	name: String,
	type: String,
	description: String,
	quantity: Number,
	repos: String, //repository to hold the nut
	belong: String
});

var Nut = mongoose.model('Nut', nut_schema);
module.exports.create_nut = function(params){
	return new Nut(params);
}

module.exports.find_nut = function(params, handle){
	Nut.findOne(params, function(err, nut){
		handle(err, nut);
	});
}

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
