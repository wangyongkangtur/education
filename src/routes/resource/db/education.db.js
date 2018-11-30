
var config = require('config');
var mongoose = require('mongoose');

var DB_URL = config.get('mongo.education');

const options = {
    server:
        {
            reconnectTries: Number.MAX_VALUE,
            reconnectInterval: 1000,
            auto_reconnect: true,
            poolSize: 10,
            connectTimeoutMS: 30000,
            socketTimeoutMS: 45000
        }
};
mongoose.connect(DB_URL,options);

mongoose.connection.on('connected', function () {
    console.log('Mongoose connection open to ' + DB_URL);
});

mongoose.connection.on('error',function (err) {
    console.log('Mongoose connection error: ' + err);
});


mongoose.connection.on('disconnected', function () {
    console.log('Mongoose connection disconnected');
});

module.exports = mongoose;
