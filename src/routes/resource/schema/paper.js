var mongoose = require('../db/education.db');
var common_status = require("../../common/status");
var Schema = mongoose.Schema;

var paper_schema = new Schema({
    title: {type: String},//标题
    describe:{type:String},//描述
    data: {type: Date, default: Date.now, index:true},//考试日期
    publish_status: {type: Number, default: common_status.paper_publish_status.not_publish},//发布状态
    create_date: {type: Date, default: Date.now},
    update_date: {type: Date, default: Date.now}
});
var collectionName = 'paper';
module.exports = mongoose.model('paper', paper_schema, collectionName);
