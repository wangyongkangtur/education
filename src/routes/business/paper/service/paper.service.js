
var paper_dao = require('../dao/paper.dao');

function create_service(data, callback) {
    paper_dao.create_dao(data, callback)
}

function delete_service(conditions, callback) {
    paper_dao.delete_dao(conditions, callback)
}

function update_service(conditions, data, callback) {
    paper_dao.update_dao(conditions, data, callback)
}

function retrieve_service(conditions, field, callback) {
    paper_dao.retrieve_dao(conditions, field, callback);
}

var pagination_service = function (options, fieldJson, populate, whereCondition, callback) {
    paper_dao.pagination_dao(options, fieldJson, populate, whereCondition, callback);
};


module.exports = {
    "create_service":create_service,
    "delete_service": delete_service,
    "update_service": update_service,
    "retrieve_service":retrieve_service,
    "pagination_service": pagination_service
};
