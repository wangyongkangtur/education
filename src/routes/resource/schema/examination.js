var mongoose = require('../db/education.db');
var question = require("./question");
var Schema = mongoose.Schema;

var examinationSchema = new Schema({
    user: {type: mongoose.Schema.ObjectId, ref:'user', index: true},//用户名
    question: {type: mongoose.Schema.ObjectId, ref:'question', index: true},//问题
    paper:{type: mongoose.Schema.ObjectId, ref:"paper", index: true},//试卷
    answer: {type: Object},//答案
    status: {type: Number},//答题状态
    create_date: {type: Date, default: Date.now, index:true},
    update_date: {type: Date, default: Date.now}

});

module.exports = mongoose.model('examination', examinationSchema);
