/**
 * Created by liulingfeng on 8/8/16.
 */
var mongoose = require('mongoose');
var mongodb = require('mongodb');
var Q = require('q');

var _db = '';

var connect = function(db){
    var def = Q.defer();
    _db = db;
    mongoose.connect(_db);
    var conn = mongoose.connection;
    conn.on('error', function(){
        def.reject(new Error('connect'));
    });
    conn.on('open', function(){
        def.resolve();
    });

    return def.promise;
};


var create = function(obj){
    var def = Q.defer();

    obj.save(function (err) {
        if (err){
            def.reject(new Error('save'));
        }
        else {
            def.resolve();
        }
    });

    return def.promise;
};

var find = function(params, model){
    var def = Q.defer();

    // params = {'email': 'lingfeng.liu@gmail.com', 'password':'87656644'};
    model.findOne(params, function(err, obj){
        if (err){
            def.reject(new Error('find'));
        }
        else {
            def.resolve(obj);
        }
    });

    return def.promise;
};

var remove = function(params, model){
    var def = Q.defer();

    var ops = {
        'maxTimeMS': 1000
    };
    model.findOneAndRemove(params, ops, function (err, doc, res) {
        if (err) {
            def.reject(new Error('remove'));
        }
        else{
            def.resolve(res);
        }
    });

    return def.promise;
};

var update = function(query_params, params, model){
    var def = Q.defer();
    model.findOneAndUpdate(query_params, params, function (err, count) {
        if (err) {
            def.reject(new Error('update'));
        }
        else {
            def.resolve(count);
        }
    });
    return def.promise;
};

module.exports = {'connect':connect, 'find':find, 'create': create, 'remove':remove, 'update':update};
