
var paper = require("../../../resource/schema/paper");
var kit = require('../../../common/util/kit');


function create_dao(data, callback) {
    paper.create(data, callback)
}

function delete_dao(conditions, callback) {
    paper.remove(conditions, callback)
}

function update_dao(conditions, data, callback) {
    var options = {"new":true};// true to return the modified document rather than the original. defaults to false
    paper.update(conditions, data, options, callback)
}


function retrieve_dao(conditions, field, callback) {
    paper.find(conditions, field).exec(callback);
}

var pagination_dao = function (options, fieldJson, populate, whereCondition, callback) {
    kit.pageQuery(options.skip, options.limit, paper, fieldJson, populate, whereCondition, options.sort, callback);
};

module.exports = {
    "create_dao":create_dao,
    "delete_dao": delete_dao,
    "update_dao": update_dao,
    "retrieve_dao":retrieve_dao,
    "pagination_dao": pagination_dao
};
