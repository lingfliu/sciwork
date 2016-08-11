/**
 * Created by liulingfeng on 8/9/16.
 */

var mongo_helper = require("./mongo_helper");
var shortid = require('shortid');
var account_model = require("../model/account");
var model = account_model.Account;

var config = require("../config");
var string_utils = require("../utils/string_utils");
var crypto = require("crypto-js");
var Q = require("q");


//return promise
var create_account = function(username, password){
    var def = Q.defer();
    var name_type = string_utils.format_check(username);

    if (name_type == 'error'){
        def.reject(new Error('format'));
    }

    find_account_byusername(username)
        .then(function(acnt){
            if (acnt) {
                def.reject(new Error('taken'));
            }
            else {
                var uid = shortid.generate();
                var secret = config.PASSWORD_SECRET;
                var params = {'uid': uid, 'password': crypto.AES.encrypt(password, secret).toString()};
                if (name_type == 'email'){
                    params.email = username;
                }
                else if (name_type == 'mobile'){
                    params.mobile = username;
                }

                var acnt = new model(params);
                mongo_helper.create(acnt)
                    .then(function () {
                        def.resolve(uid);
                    })
                    .catch(function (err) {
                        def.reject(new Error('save'));
                    });
            }
        })
        .catch(function(err){
            def.reject(new Error('error'));
        });

    return def.promise;
}

var find_account_byusername = function(username){
    var def = Q.defer();
    var name_type = string_utils.format_check(username);
    var params;
    if (name_type == 'email' || name_type == 'mobile') {
        if (name_type == 'email') {
            params = {'email':username};
        }
        else {
            params = {'mobile':username};
        }

        mongo_helper.find(params, model).then(function(acnt){
            def.resolve(acnt);
        }).catch(function(err){
            def.reject(new Error('nofound'));
        });
    }
    else {
        def.reject(new Error('format'));
    }

    return def.promise;
}

var find_account_byemail = function(email){
    var def = Q.defer();
    var params = {'email': email};
    mongo_helper.find(params, model).then(function(acnt){
        def.resolve(acnt);
    }).catch(function (error) {
        def.reject(new Error('nofound'));
    });

    return def.promise;
}

var find_account_bymobile = function(mobile){
    var def = Q.defer();
    var params = {'mobile': email};
    mongo_helper.find(params, model).then(function(acnt){
        def.resolve(acnt);
    }).catch(function (error) {
        def.reject(new Error('nofound'));
    });

    return def.promise;
}

var find_account_byuid = function(uid){
    var def = Q.defer();
    var params = {'uid': uid};
    mongo_helper.find(params, model).then(function(acnt){
        def.resolve(acnt);
    }).catch(function(err){
        def.reject(new Error('nofound'));
    });

    return def.promise;
}

var update_account = function(uid, password, params){
    var def = Q.defer();

    var query_params = {'uid':uid};
    mongo_helper.find(query_params, model).then(function(acnt){
    }).catch(function (err) {
        def.reject(new Error('nofound'));
    });

    if (account){
        if (params.email){
            account.email = params.email;
        }
        if (params.mobile){
            account.mobile = params.mobile;
        }
        if (params.password) {
            account.password = crypto.AES.encrypt(params.password, config.PASSWORD_SECRET).toString();
        }
        mongo_helper.save(account);
        def.resolve(uid);
    }
    else {
        def.reject(Error('nofound'));
    }

    return def.promise;
}

var delete_account = function(uid){
    var def = Q.defer();
    var params = {'uid':uid};
    mongo_helper.remove(params, model).then(function(){
        def.resolve();
    }).catch(function(err){
        def.reject(err);
    });

    return def.promise;
}

module.exports = {'create_account':create_account,
    'find_account_byusername':find_account_byusername,
    'find_account_byuid':find_account_byuid,
    'update_account':update_account,
    'delete_account':delete_account};