
var answer_sheet_dao = require('../dao/answer_sheet.dao');

function create_service(data, callback) {
    answer_sheet_dao.create_dao(data, callback)
}

function delete_service(conditions, callback) {
    answer_sheet_dao.delete_dao(conditions, callback)
}

function update_service(conditions, data, callback) {
    answer_sheet_dao.update_dao(conditions, data, options, callback)
}

function retrieve_service(conditions, field, callback) {
    answer_sheet_dao.retrieve_dao(conditions, field, callback);
}

var pagination_service = function (options, populate, whereCondition, callback) {
    answer_sheet_dao.pagination_dao(options, populate, whereCondition, callback);
};

function retrieve_paper_summary_aggregate_service(user, callback) {
    answer_sheet_dao.retrieve_paper_summary_aggregate_dao(user, callback);
}

module.exports = {
    "create_service":create_service,
    "delete_service": delete_service,
    "update_service": update_service,
    "retrieve_service":retrieve_service,
    "pagination_service": pagination_service,
    "retrieve_paper_summary_aggregate_service": retrieve_paper_summary_aggregate_service,
    "retrieve_paper_summary_aggregate_service": retrieve_paper_summary_aggregate_service,
};
