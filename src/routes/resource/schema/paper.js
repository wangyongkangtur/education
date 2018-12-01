var mongoose = require('../db/education.db');
var Schema = mongoose.Schema;

var paper_schema = new Schema({
    title: {type: String},//标题
    number: {type: Number},//序号
    create_date: {type: Date, default: Date.now, index:true},
    update_date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('examination', paper_schema);
