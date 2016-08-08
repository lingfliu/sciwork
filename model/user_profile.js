/**
 * Created by liulingfeng on 8/8/16.
 */
var mongoose = require('mongoose');

var user_profile_schema = mongoose.Schema({
    uid: String,
    email: String,
    mobile: String,
    title: String,
    contacts: [String],
    belongs: [String],
    profile: String,
    projects: [String],
    works: [String]
});
var UserProfile = mongoose.model('UserProfile', user_profile_schema);

module.exports = UserProfile;

