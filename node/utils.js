//tools
//TODO: move to module
var uuid = require('node-uuid');

module.export.generate_uuid(){
	return uuid.v4();
}


//TODO: move to module
var uid_type = function(uid){
module.export.username_check = function(username){
	var reg_mobil = new RegExp("^[0-9]*$");			
	var reg_email = new RegExp("[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,4}");

	if (username == '') {
		return 'empty';
	}
	else if (reg_email.test(uid)){
		return 'email';
	}
	else if (reg_mobil.test(uid)){
		return 'mobile';
	}
	else {
		return 'err';
	}	
};

