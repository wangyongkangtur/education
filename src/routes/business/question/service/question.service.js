
var question_dao = require('../dao/question.dao');

function create_service(data, callback) {
    question_dao.create_dao(data, callback)
}

function delete_service(conditions, callback) {
    question_dao.delete_dao(conditions, callback)
}

function update_service(conditions, data, callback) {
    question_dao.update_dao(conditions, data, callback)
}

function retrieve_service(conditions, field, callback) {
    question_dao.retrieve_dao(conditions, field, callback);
}

function pagination_service(options, fieldJson, populate, whereCondition, callback) {
    question_dao.pagination_dao(options, fieldJson, populate, whereCondition, callback);
}

var retrieve_question_for_published_paper_pagination_service = function (page, page_size, callback) {
    question_dao.retrieve_question_for_published_paper_pagination_dao(page, page_size, callback);
};


module.exports = {
    "create_service":create_service,
    "delete_service": delete_service,
    "update_service": update_service,
    "retrieve_service":retrieve_service,
    "pagination_service": pagination_service,
    "retrieve_question_for_published_paper_pagination_service": retrieve_question_for_published_paper_pagination_service
};
