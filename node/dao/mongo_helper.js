var mongoose = require('mongoose');

module.exports.connect = function(ip, db_name){
	mongoose.connect('mongodb://'+ip+'/'+db_name, function(err){
		if (err){
			return err;
		}
		else {
			return 'done';
		}
	});
}


module.exports.create = function(params, model){
	var target = new model(params);
	target.save(function(err){
		if (err){
			return('err');
		}
		else {
			return target;
		}
	});
}

module.exports.get = function(params, model){
	var target = model.findOne(params, function(err, target){
	});
	return 
}

module.exports.update = function(query_params, new_params, model){
	model.findOneAndUpdate(query, new_params, function(err){
	});
}

module.exports.del = function(params, model){
	model.remove(params, function(err, user)){
	}
}
