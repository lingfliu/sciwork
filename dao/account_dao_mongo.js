/**
 * Created by liulingfeng on 8/9/16.
 */

var mongo_helper = require("./mongo_helper");
var uuid = require('uuid');
var account_model = require("../model/account");
var config = require("../config");
var string_utils = require("../utils/string_utils");
var crypto = require("crypto-js");


var password_secret = config.PASSWORD_SECRET;

var create_account = function(username, password){
    var type = string_utils.format_check(username);
    var salt = '2bqtd9af';
    var password_encrypt = password + salt;
    var uid = uuid.v1();
    var params = {'uid': uid, type: username, 'password':crypto.AES.encrypt(password_encrypt,password_secret)};
    var acnt = new account_model(params);
    mongo_helper.create(acnt);
    return uid;
}

var find_account_byusername = function(username, password){
    var type = string_utils.format_check(username);
    var password_encrypt = password + salt;
    var params = {type: username};
    var account = mongo_helper.find(params, account_model);
    if (account){
        var password_decrypt = crypto.AES.decrypt(account.password, password_secret);
        var password_len = password_decrypt.size;
        password_decrypt = password_decrypt.substr(0, password_len-8);
        if (password_decrypt.equals(password)){
            return account.uid;
        }
        else {
            return new Error('account');
        }
    }
    else {
        return new Error('account');
    }
}

var update_account = function(uid, password, account_new){
    var type = string_utils.format_check(username);
    var password_encrypt = password + salt;
    var params = {type: username};
    var account = mongo_helper.find(params, account_model);
    if (account){
        var password_decrypt = crypto.AES.decrypt(account.password, password_secret);
        var password_len = password_decrypt.length;
        password_decrypt = password_decrypt.substr(0, password_len-8);
        if (password_decrypt.equals(password)){
            return account.uid;
        }
        else {
            return new Error('update');
        }
    }
    else {
        return new Error('update');
    }
}

var delete_account = function(email, mobile, password){

}

module.exports = {'create_account':create_account, 'find_account_byusername':find_account_byusername, 'find_account_byuid':find_account_byuid, 'update_account':update_account}