/**
 * Created by liulingfeng on 2016/8/9.
 */
var string_utils = require('./utils/string_utils');

console.log(string_utils.random_string(8));

var config = require("./config");

var crypto = require('crypto-js');

/*crypto test*/
var msg = 'message';
// var encrypt_msg = crypto.AES.encrypt(msg, config.PASSWORD_SECRET);
// var decrypt_msg = crypto.AES.decrypt(encrypt_msg.toString(), config.PASSWORD_SECRET);
var encrypt_msg = crypto.SHA1(msg);
var decrypt_msg = crypto.SHA1(encrypt_msg);
var plaintext = decrypt_msg.toString();
console.log(plaintext);

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
            console.log('taken, removing');
            return account_dao.delete_account(acnt.uid)
        }
        else {
            return 'hello';
        }
    })
    .then(function(){
        return account_dao.create_account('lingfeng.liu@163.com', '87656644');
    })
    .then(function(uid){
        console.log('created account, uid = ' + uid);
        this.uid = uid;
        return account_dao.delete_account(uid);
    })
    .then(function(){
        console.log('removed account: ' + this.uid);
    })
    .catch(function(err){
        //if not found
        console.log(err);
        account_dao.create_account('lingfeng.liu@163.com', '87656644')
            .then(function(uid){
                console.log('created account, uid = ' + uid);
                this.uid = uid;
                return account_dao.delete_account(uid);
            })
            .then(function(){
                console.log('removed account: ' + this.uid);
            })
            .catch(function(err){
                console.log(err);
            })
    });

