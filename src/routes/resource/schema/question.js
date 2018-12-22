var mongoose = require('../db/education.db');
var paper = require("./paper");
var Schema = mongoose.Schema;

var question_schema = new Schema({
    type: {type: Number},//类型
    content: {type: Object},//内容
    selections: {type: Object},//选线
    answer: {type: Object},//答案
    explain: {type: Object},//解释
    number: {type: Number},//序号
    //category:{type: mongoose.Schema.ObjectId, ref: "category", default: null, index: true},//分类
    //subject:{type: mongoose.Schema.ObjectId, ref:"subject", index: true},//领域
    paper:{type: mongoose.Schema.ObjectId, ref:"paper", index: true},//试卷
    create_date: {type: Date, default: Date.now, index:true},//创建时间
    update_date: {type: Date, default: Date.now}//更新时间
});
var collectionName = 'question';
module.exports = mongoose.model("question", question_schema, collectionName);
