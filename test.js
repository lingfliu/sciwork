/**
 * Created by liulingfeng on 2016/8/9.
 */
var string_utils = require('./utils/string_utils');

console.log(string_utils.random_string(8));

var config = require("./config");

var crypto = require('crypto-js');

/*crypto test*/
var msg = 'message';
var key = "key";
var password = '87656644'
var salt = string_utils.random_string(8);

// var encrypt_msg = crypto.AES.encrypt(msg, config.PASSWORD_SECRET);
// var decrypt_msg = crypto.AES.decrypt(encrypt_msg.toString(), config.PASSWORD_SECRET);
var encrypt_password = crypto.SHA1(password+salt);
var another_password = crypto.SHA1(password+salt);
console.log(encrypt_password.toString(crypto.enc.Base64));
console.log(another_password.toString(crypto.enc.Base64));

/*mongodb test*/
var account_model = require('./model/account');
var model = account_model.Account;

var account_a = 'lingfeng.liu@163.com';
var account_b = '18679823932';

console.log(string_utils.format_check(account_a));
console.log(string_utils.format_check(account_b));

var account_dao = require('./dao/account_dao_mongo');

var mongo_helper = require('./dao/mongo_helper');
var db = 'mongodb://127.0.0.1:27017/sci';
mongo_helper.connect(db).then(function(){
    console.log('connected to mongodb/sci');
}).catch(function(err){
    setTimeout(function(){
        return mongo_helper.connect(db);
    })
});

var uid;

account_dao.find_account_byusername('lingfeng.liu@163.com')
    .then(function(acnt){
        if (acnt) {
            console.log('taken, deleting acnt ' + acnt.uid);
            return account_dao.delete_account(acnt.uid)
        }
        else {
            return;
        }
    })
    .then(function(uid){
        if (uid) {
            console.log('delete account ' + uid)
        }
        return account_dao.create_account('lingfeng.liu@163.com', '87656644');
    })
    .then(function(uid){
        console.log('created account, uid = ' + uid);
    })
    .catch(function(err){
        console.log(err);
    })
    .done();

account_dao.find_account_byusername('lingfeng.liu@163.com')
    .then(function(acnt){
        if (!acnt) {
            throw new Error('nofound');
        }
        else {
            acnt.mobile = '18679823932';
            var params = {
                'uid': acnt.uid,
                'email': acnt.email,
                'mobile': acnt.mobile,
                'password': '87656644'
            }
            this.uid = acnt.uid;
            return account_dao.update_account(acnt.uid, '87656644', params);
        }
    })
    .then(function(){
        console.log('updated account ' + this.uid);
    })
    .catch(function(err){
        console.log(err);
    });
