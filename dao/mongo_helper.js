/**
 * Created by liulingfeng on 8/8/16.
 */
var mongoose = require('mongoose');
var mongodb = require('mongodb');

var _db = '';

var conn = mongoose.connection;
conn.on('error', function(){
    setTimeout(function(){
        mongoose.connect(_db);
    }, 1000);
});

conn.once('open', function(){
   //connected
});

var connect = function(db){
    _db = db;
    mongoose.connect(_db);
};

var save = function(obj){
    mongoose.save(function (err, func) {
        if (err){
            return new Error('save');
        }
    });
};

var find = function(params, model){
    mongoose.find(params, function (err, obj) {
       if (err){
           return new Error('find');
       }
       return obj;
    });
};

var remove = function(params, model){
    var ops = {
        maxTimeMS: 1000,
    };
    model.findOneAndDelete(params, ops, function (err, res) {
        if (err) return new Error('remove');
        return res;
    });
};

var update = function(query_params, params, model){
    model.findOneAndUpdate(query_params, params, function (err, count) {
        if (err) {
            return new Error('update');
        }
        return count;
    });
};
