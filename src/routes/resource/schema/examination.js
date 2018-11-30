var mongoose = require('../db/education.db');
var question = require("./question");
var Schema = mongoose.Schema;

var examinationSchema = new Schema({
    creator: {type: mongoose.Schema.ObjectId, ref:'user', index: true},
    question: {type: mongoose.Schema.ObjectId, ref:'question', index: true},
    create_date: {type: Date, default: Date.now, index:true},
    update_date: {type: Date, default: Date.now}

});

module.exports = mongoose.model('examination', examinationSchema);
