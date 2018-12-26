var question_service = require('../../question/service/question.service');
var answer_sheet_service = require('../../answer_sheet/service/answer_sheet.service');
var answer_sheet = require('../../../resource/schema/answer_sheet');

var create_answer_sheet_service = function (user, callback) {
    var options = {
        "skip":1,
        "limit":100000
    };
    question_service.retrieve_question_for_published_paper_pagination_service(options.skip, options.limit, function (err, results) {
        if (err) {
            callback(err);
        } else {
            var question_info = results.data;
            var data = new Array();
            for (var i = 0; i < question_info.length; i++ ) {
                var record = new answer_sheet({
                    user: user,
                    question: question_info[i]._id,
                    paper: question_info[i].paper
                });
                data.push(record);
            }
            answer_sheet.insertMany(data, function(err,doc) {

            });
            callback(null, "success");
        }
    });
};

var delete_answer_sheet_service = function (user, callback) {
    var conditions = {"user": user};
    answer_sheet_service.delete_service(conditions, callback);
};

module.exports = {
    "create_answer_sheet_service":create_answer_sheet_service,
    "delete_answer_sheet_service":delete_answer_sheet_service
};
