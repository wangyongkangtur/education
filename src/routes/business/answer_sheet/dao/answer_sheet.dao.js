
var answer_sheet = require("../../../resource/schema/answer_sheet");
var kit = require('../../../common/util/kit');
var mongoose = require('mongoose');
var async = require('async');

function create_dao(data, callback) {
    answer_sheet.create(data, callback)
}

function delete_dao(conditions, callback) {
    answer_sheet.remove(conditions, callback)
}

function update_dao(conditions, data, callback) {
    var options = {"new":true};// true to return the modified document rather than the original. defaults to false
    answer_sheet.update(conditions, data, options, callback)
}


// function retrieve_dao(conditions, field, callback) {
//     answer_sheet.find(conditions, field).exec(callback);
// }

function retrieve_dao(conditions, field, callback) {
    answer_sheet.find(conditions, field).populate({path: "question", options: {sort: { "question.number": 1 }}}).exec(callback);
}
// , populate : {path : 'paper'}

function pagination_dao(options, populate, whereCondition, callback) {
    kit.pageQuery(options.skip, options.limit, answer_sheet, populate, whereCondition, options.sort, callback);
}

function retrieve_paper_summary_pagination_dao(page, page_size, user, paper, callback) {
    var start = (page - 1) * page_size;
    var $page = {};
    var match = paper ? {$match:{user: mongoose.Types.ObjectId(user), paper: mongoose.Types.ObjectId(paper)}} : {$match:{user:mongoose.Types.ObjectId(user)}};
    async.parallel({
        count: function (callback) {
            answer_sheet.aggregate(
                [
                     match,
                    {$group : {_id: "$paper"}},
                    {$count: "count"}
                ],callback)
        },
        records: function (callback) {
            answer_sheet.aggregate(
                [
                     match,
                    {
                        $lookup: {
                            from: "user",
                            localField: "user",
                            foreignField: "_id",
                            as: "users"
                        }
                    },
                    {
                        $unwind: {
                            path: "$users",
                            preserveNullAndEmptyArrays: true
                        }
                    },
                    {
                        $lookup: {
                            from: "question",
                            localField: "question",
                            foreignField: "_id",
                            as: "questions"
                        }
                    },
                    {
                        $unwind: {
                            path: "$questions",
                            preserveNullAndEmptyArrays: true
                        }
                    },
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
                    {$sort:{"questions.number":1}},
                    {$group : {_id: "$paper",paper_name:{$first:"$papers.title"},paper_data:{$first:"$papers.data"},status:{$push: "$status"}}},
                    {$sort:{"paper_data":-1}},
                    {$skip: start},
                    {$limit: page_size}
                ], callback)
        }
    }, function (err, results) {
        if (err) {
            callback(err)
        } else {
            $page.total = results.count[0].count;
            $page.data = results.records;
            callback(err, $page);
        }
    });
}


function retrieve_question_pagination_dao(page, page_size, user, paper, callback) {
    var start = (page - 1) * page_size;
    var $page = {};
    async.parallel({
        count: function (done) {
            answer_sheet.aggregate(
                [
                    {$match:{user: mongoose.Types.ObjectId(user), paper: mongoose.Types.ObjectId(paper)}},
                    {$count: "count"}
                ],done)
        },
        records: function (done) {
            answer_sheet.aggregate(
                [
                    {$match:{user: mongoose.Types.ObjectId(user), paper: mongoose.Types.ObjectId(paper)}},
                    {
                        $lookup: {
                            from: "question",
                            localField: "question",
                            foreignField: "_id",
                            as: "questions"
                        }
                    },
                    {
                        $unwind: {
                            path: "$questions",
                            preserveNullAndEmptyArrays: true
                        }
                    },
                    {
                        $lookup: {
                            from: "paper",
                            localField: "questions.paper",
                            foreignField: "_id",
                            as: "questions.papers"
                        }
                    },
                    {
                        $unwind: {
                            path: "$questions.papers",
                            preserveNullAndEmptyArrays: true
                        }
                    },
                    {$sort:{"questions.number":-1}},
                    {$skip: start},
                    {$limit: page_size}
                ],done)
        }
    }, function (err, results) {
        if (err) {
            callback(err)
        } else {
            $page.total = results.count[0].count;
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
    "retrieve_paper_summary_pagination_dao": retrieve_paper_summary_pagination_dao,
    "retrieve_question_pagination_dao": retrieve_question_pagination_dao
};
