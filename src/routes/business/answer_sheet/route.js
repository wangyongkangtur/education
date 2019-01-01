var express = require('express');
var router = express.Router();
var answer_sheet_service = require('./service/answer_sheet.service');
var kit = require('../../common/util/kit');
var common_response = require('../../common/response');

var create_route = function (req, res) {
    var data = req.body.data;
    var waterfall = [
        function (callback) {
            answer_sheet_service.create_service(data, function (err, doc) {
                if (err) {
                    callback(kit.response(common_response.code.system_error,
                        common_response.message.system_error, err));
                } else {
                    callback(null, doc);
                }
            });
        }
    ];
    kit.waterfall(waterfall, function (err, doc) {
        if (err) {
            res.json(err);
        } else {
            res.json(kit.response(common_response.code.success,
                common_response.message.success, doc));
        }
    });


};

var delete_route = function (req, res) {
    var conditions = req.body.conditions;
    var waterfall = [
        function (callback) {
            answer_sheet_service.delete_service(conditions, function (err, doc) {
                if (err) {
                    callback(kit.response(common_response.code.system_error,
                        common_response.message.system_error, err));
                } else {
                    callback(null, doc);
                }
            });
        }
    ];
    kit.waterfall(waterfall, function (err, doc) {
        if (err) {
            res.json(err);
        } else {
            res.json(kit.response(common_response.code.success,
                common_response.message.success, doc));
        }
    });
};

var update_route = function (req, res) {
    var data = req.body.data;
    var conditions = req.body.conditions;
    var waterfall = [
        function (callback) {
            answer_sheet_service.update_service(conditions, data, function (err, doc) {
                if (err) {
                    callback(kit.response(common_response.code.system_error,
                        common_response.message.system_error, err));
                } else {
                    callback(null, doc);
                }
            });
        }
    ];
    kit.waterfall(waterfall, function (err, doc) {
        if (err) {
            res.json(err);
        } else {
            res.json(kit.response(common_response.code.success,
                common_response.message.success, doc));
        }
    });
};

var retrieve_route = function (req, res) {
    var conditions = req.body.conditions;
    var field = null;
    var waterfall = [
        function (callback) {
            answer_sheet_service.retrieve_service(conditions, field, function (err, doc) {
                if (err) {
                    callback(kit.response(common_response.code.system_error,
                        common_response.message.system_error, err));
                } else {
                    callback(null, doc);
                }
            });
        }
    ];
    kit.waterfall(waterfall, function (err, doc) {
        if (err) {
            res.json(err);
        } else {
            res.json(kit.response(common_response.code.success,
                common_response.message.success, doc));
        }
    });
};

var pagination_route = function (req, res) {
    var options = req.body.options;
    var populate = req.body.populate;
    var whereCondition = null;
    var waterfall = [
        function (callback) {
            answer_sheet_service.pagination_service(options, populate, whereCondition, function (err, doc) {
                if (err) {
                    callback(kit.response(common_response.code.system_error,
                        common_response.message.system_error, err));
                } else {
                    callback(null, doc);
                }
            });
        }
    ];
    kit.waterfall(waterfall, function (err, doc) {
        if (err) {
            res.json(err);
        } else {
            res.json(kit.response(common_response.code.success,
                common_response.message.success, doc));
        }
    });
};

var retrieve_paper_summary_pagination_route = function (req, res) {
    var conditions = req.body.conditions;
    var options = req.body.options;
    var page = options.skip;
    var page_size = options.limit;
    var user = conditions.user;
    var paper = conditions.paper;
    var waterfall = [
        function (callback) {
            answer_sheet_service.retrieve_paper_summary_pagination_service(page, page_size, user, paper, function (err, doc) {
                if (err) {
                    callback(kit.response(common_response.code.system_error,
                        common_response.message.system_error, err));
                } else {
                    callback(null, doc);
                }
            });
        }
    ];
    kit.waterfall(waterfall, function (err, doc) {
        if (err) {
            res.json(err);
        } else {
            res.json(kit.response(common_response.code.success,
                common_response.message.success, doc));
        }
    });
};

var retrieve_question_pagination_route = function (req, res) {
    var conditions = req.body.conditions;
    var options = req.body.options;
    var page = options.skip;
    var page_size = options.limit;
    var user = conditions.user;
    var paper = conditions.paper;
    var _id = conditions._id;
    var waterfall = [
        function (callback) {
            answer_sheet_service.retrieve_question_pagination_service(page, page_size, user, paper, _id, function (err, doc) {
                if (err) {
                    callback(kit.response(common_response.code.system_error,
                        common_response.message.system_error, err));
                } else {
                    callback(null, doc);
                }
            });
        }
    ];
    kit.waterfall(waterfall, function (err, doc) {
        if (err) {
            res.json(err);
        } else {
            res.json(kit.response(common_response.code.success,
                common_response.message.success, doc));
        }
    });
};

router.route('/create').post(create_route);
router.route('/delete').post(delete_route);
router.route('/update').post(update_route);
router.route('/retrieve').post(retrieve_route);
router.route('/pagination').post(pagination_route);
router.route('/retrieve_paper_summary_pagination').post(retrieve_paper_summary_pagination_route);
router.route('/retrieve_question_pagination').post(retrieve_question_pagination_route);
module.exports = router;
