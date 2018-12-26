var async = require('async');
var question_service = require('../../question/service/question.service');
var user_service = require('../../user/service/user.service');
var answer_sheet = require('../../../resource/schema/answer_sheet');

var publish_service = function (paper, callback) {
    var publish_service_function_array = [];
    var question_service_resource_function = function (querycallback) {
        var options = {
            "skip":1,
            "limit":100000
        };
        var whereCondition = {
            "paper": paper
        };
        var populate = "";
        var fieldJson = "";
        question_service.pagination_service(options, fieldJson, populate, whereCondition,querycallback);
    };

    var user_service_resource_function = function (querycallback) {
        var options = {
            "skip":1,
            "limit":100000
        };
        var whereCondition = {
        };
        var populate = "";
        var fieldJson = "";
        user_service.pagination_service(options, fieldJson, populate, whereCondition, querycallback);
    };

    publish_service_function_array.push(question_service_resource_function);
    publish_service_function_array.push(user_service_resource_function);

    async.parallel(publish_service_function_array,
        function (err, results) {
            if (err) {
                callback(err);
            } else {
                var question_info = results[0].data;
                var user_info = results[1].data;
                var data = new Array();
                for (var i = 0; i < user_info.length; i++ ) {
                    for (var j = 0; j < question_info.length; j++ ) {
                        var record = new answer_sheet({
                            user: user_info[i]._id,
                            question: question_info[j]._id,
                            paper: paper
                        });
                        data.push(record);
                    }
                }
                answer_sheet.insertMany(data, function(err,doc) {

                })
                callback(null, "success");
            }
        });
};


module.exports = {
    "publish_service":publish_service
};
