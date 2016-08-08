/**
 * Created by liulingfeng on 8/8/16.
 */
var mongoose = require('mongoose');

var research_schema = mongoose.Schema({
    id: String,
    belongs: [String],
    mic: String,
    members: [String],
    profile: String,
    works: [String]
});
var Research = mongoose.model('Research', research_schema);

module.exports = Research;

