
var mongoose = require('../db/education.db');
var Schema = mongoose.Schema;


var userSchema = new Schema({
    username: {type: String, index: true},
    password: {type: String},
    nickname: {type: String},
    avatar: { type: String},
    mail: {type: String },
    phone: {type: String },
    creator: {type: mongoose.Schema.ObjectId, ref:'user', index: true},
    create_date: {type: Date, default: Date.now},
    update_date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('user', userSchema);
