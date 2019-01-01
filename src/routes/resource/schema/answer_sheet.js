var mongoose = require('../db/education.db');
var question = require("./question");
var paper = require("./paper");
var common_status = require("../../common/status");
var Schema = mongoose.Schema;

var answer_sheet_schema = new Schema({
    user: {type: mongoose.Schema.ObjectId, ref:'user', required: true, index: true},//用户id
    question: {type: mongoose.Schema.ObjectId, ref:'question', required: true, index: true},//问题id
    paper:{type: mongoose.Schema.ObjectId, ref:"paper", required: true, index: true},//试卷id
    answer: {type: Object},//答案
    status: {type: Number, default: common_status.answer_sheet_status.blank},//答题状态
    create_date: {type: Date, default: Date.now, index:true},
    update_date: {type: Date, default: Date.now}
});
var collectionName = 'answer_sheet';
module.exports = mongoose.model('answer_sheet', answer_sheet_schema, collectionName);
