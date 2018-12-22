
var mongoose = require('../db/education.db');
var Schema = mongoose.Schema;


var user_schema = new Schema({
    username: {type: String, index: true},
    password: {type: String},
    mail: {type: String },
    phone: {type: String },
    create_date: {type: Date, default: Date.now},
    update_date: {type: Date, default: Date.now}
});
var collectionName = 'user';
module.exports = mongoose.model('user', user_schema, collectionName);
