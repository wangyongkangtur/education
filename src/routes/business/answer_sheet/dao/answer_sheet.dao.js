
var answer_sheet = require("../../../resource/schema/answer_sheet");
var kit = require('../../../common/util/kit');
var mongoose = require('mongoose');

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


function retrieve_dao(conditions, field, callback) {
    answer_sheet.find(conditions, field).exec(callback);
}

var pagination_dao = function (options, populate, whereCondition, callback) {
    kit.pageQuery(options.skip, options.limit, answer_sheet, populate, whereCondition, options.sort, callback);
};

function retrieve_paper_summary_aggregate_dao(user, callback) {
    answer_sheet.aggregate(
        [
            {$match:{user:mongoose.Types.ObjectId(user)}},
            {
                $lookup: { // 左连接
                    from: "user", // 关联到user表
                    localField: "user", // answer_sheet 表关联的字段
                    foreignField: "_id", // user 表关联的字段
                    as: "users"
                }
            },
            {
                $unwind: { // 拆分子数组
                    path: "$users",
                    preserveNullAndEmptyArrays: true // 空的数组也拆分
                }
            },
            {
                $lookup: { // 左连接
                    from: "question", // 关联到question表
                    localField: "question", // answer_sheet 表关联的字段
                    foreignField: "_id", // ques tion 表关联的字段
                    as: "questions"
                }
            },
            {
                $unwind: { // 拆分子数组
                    path: "$questions",
                    preserveNullAndEmptyArrays: true // 空的数组也拆分
                }
            },
            {
                $lookup: { // 左连接
                    from: "paper", // 关联到paper表
                    localField: "paper", // answer_sheet 表关联的字段
                    foreignField: "_id", // paper 表关联的字段
                    as: "papers"
                }
            },
            {
                $unwind: { // 拆分子数组
                    path: "$papers",
                    preserveNullAndEmptyArrays: true // 空的数组也拆分
                }
            },
            {$sort:{"questions.number":1}}, // 试题排序
            {$group : {_id: "$paper",paper_name:{$first:"$papers.title"},paper_data:{$first:"$papers.data"},status:{$push: "$status"}}},
            {$sort:{"paper_data":-1}}   // 试卷排序
        ], callback)
}


module.exports = {
    "create_dao":create_dao,
    "delete_dao": delete_dao,
    "update_dao": update_dao,
    "retrieve_dao":retrieve_dao,
    "pagination_dao": pagination_dao,
    "retrieve_paper_summary_aggregate_dao": retrieve_paper_summary_aggregate_dao
};
