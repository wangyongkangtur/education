var mongoose = require('../db/education.db');
var user = require("./user");
var paper = require("./paper");
var Schema = mongoose.Schema;

var questionSchema = new Schema({
    type: {type: Number},
    describe: {type: Object},
    options: {type: Object},
    answer: {type: Object},
    analysis: {type: Object},
    sort: {type: Number},
    paper:{type: mongoose.Schema.ObjectId, ref:"paper", index: true},
    creator: {type: mongoose.Schema.ObjectId, ref:"user", index: true},
    create_date: {type: Date, default: Date.now, index:true},
    update_date: {type: Date, default: Date.now}
});

module.exports = mongoose.model("question", questionSchema);
