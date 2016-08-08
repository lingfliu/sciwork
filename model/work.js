/**
 * Created by liulingfeng on 8/8/16.
 */
var mongoose = require('mongoose');

var work_schema = mongoose.Schema({
    id: String,
    type: String,
    project: String,
    profile: String,
    share: String,
    availability: Number
});
var Work = mongoose.model('Work', work_schema);

module.exports = Work;