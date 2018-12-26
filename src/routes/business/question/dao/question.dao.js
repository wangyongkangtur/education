var async = require('async');
var question = require("../../../resource/schema/question");
var common_status = require('../../../common/status');
var kit = require('../../../common/util/kit');


function create_dao(data, callback) {
    question.create(data, callback)
}

function delete_dao(conditions, callback) {
    question.remove(conditions, callback)
}

function update_dao(conditions, data, callback) {
    var options = {"new":true};// true to return the modified document rather than the original. defaults to false
    question.update(conditions, data, options, callback)
}


function retrieve_dao(conditions, field, callback) {
    question.find(conditions, field).exec(callback);
}

var pagination_dao = function (options, fieldJson, populate, whereCondition, callback) {
    kit.pageQuery(options.skip, options.limit, question, fieldJson, populate, whereCondition, options.sort, callback);
};

function retrieve_question_for_published_paper_pagination_dao(page, page_size, callback) {
    var start = (page - 1) * page_size;
    var $page = {};
    async.parallel({
        count: function (done) {
            question.aggregate(
                [
                    {
                        $lookup: {
                            from: "paper",
                            localField: "paper",
                            foreignField: "_id",
                            as: "papers"
                        }
                    },
                    {
                        $unwind: {
                            path: "$papers",
                            preserveNullAndEmptyArrays: true
                        }
                    },
                    {$match:{"papers.publish_status": common_status.paper_publish_status.published}},
                    {$count: "count"}
                ],done)
        },
        records: function (done) {
            question.aggregate(
                [
                    {
                        $lookup: {
                            from: "paper",
                            localField: "paper",
                            foreignField: "_id",
                            as: "papers"
                        }
                    },
                    {
                        $unwind: {
                            path: "$papers",
                            preserveNullAndEmptyArrays: true
                        }
                    },
                    {$match:{"papers.publish_status": common_status.paper_publish_status.published}},
                    {$skip: start},
                    {$limit: page_size}
                ], done)
        }
    }, function (err, results) {
        if (err) {
            callback(err)
        } else {
            $page.total = results.count[0] ? results.count[0].count : 0;
            $page.data = results.records;
            callback(err, $page);
        }
    });
}


module.exports = {
    "create_dao":create_dao,
    "delete_dao": delete_dao,
    "update_dao": update_dao,
    "retrieve_dao":retrieve_dao,
    "pagination_dao": pagination_dao,
    "retrieve_question_for_published_paper_pagination_dao":retrieve_question_for_published_paper_pagination_dao
};
