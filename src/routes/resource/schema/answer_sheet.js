var mongoose = require('../db/education.db');
var question = require("./question");
var paper = require("./paper");
var common_status = require("../../common/status");
var Schema = mongoose.Schema;

var answer_sheet_schema = new Schema({
    user: {type: mongoose.Schema.ObjectId, ref:'user', index: true},//用户名
    question: {type: mongoose.Schema.ObjectId, ref:'question', index: true},//问题
    paper:{type: mongoose.Schema.ObjectId, ref:"paper", index: true},//试卷
    answer: {type: Object},//答案
    number: {type: Number},//序号
    status: {type: Number, default: common_status.answer_sheet_status.blank},//答题状态
    create_date: {type: Date, default: Date.now, index:true},
    update_date: {type: Date, default: Date.now}

});

module.exports = mongoose.model('answer_sheet', answer_sheet_schema);
