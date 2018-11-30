var mongoose = require('../db/education.db');
var question = require("./question");
var Schema = mongoose.Schema;

var examinationSchema = new Schema({
    title: {type: String},
    time: {type: String},
    creator: {type: mongoose.Schema.ObjectId, ref:"user", index: true},
    create_date: {type: Date, default: Date.now, index:true},
    update_date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('examination', examinationSchema);
