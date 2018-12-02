
var answer_sheet = require("../../../resource/schema/answer_sheet");
var kit = require('../../../common/util/kit');


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

module.exports = {
    "create_dao":create_dao,
    "delete_dao": delete_dao,
    "update_dao": update_dao,
    "retrieve_dao":retrieve_dao,
    "pagination_dao": pagination_dao
};
