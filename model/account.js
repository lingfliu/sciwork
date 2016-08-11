/**
 * Created by liulingfeng on 8/8/16.
 */
var mongoose = require('mongoose');

var account_schema = mongoose.Schema({
    uid: String,
    email: String,
    mobile: String,
    password: String
});
var Account = mongoose.model('Account', account_schema);

module.exports.Account = Account;

