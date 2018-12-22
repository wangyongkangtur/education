
var user_dao = require('../dao/user.dao');

function create_service(data, callback) {
    user_dao.create_dao(data, callback)
}

function delete_service(conditions, callback) {
    user_dao.delete_dao(conditions, callback)
}

function update_service(conditions, data, callback) {
    user_dao.update_dao(conditions, data, callback)
}

function retrieve_service(conditions, field, callback) {
    user_dao.retrieve_dao(conditions, field, callback);
}

var pagination_service = function (options, fieldJson, populate, whereCondition, callback) {
    user_dao.pagination_dao(options, fieldJson, populate, whereCondition, callback);
};


module.exports = {
    "create_service":create_service,
    "delete_service": delete_service,
    "update_service": update_service,
    "retrieve_service":retrieve_service,
    "pagination_service": pagination_service
};
