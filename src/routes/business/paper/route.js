var express = require('express');
var router = express.Router();
var paper_service = require('./service/paper.service');
var paper_external_service = require('./service/paper.external.service');
var kit = require('../../common/util/kit');
var common_response = require('../../common/response');
var common_status = require('../../common/status');

var create_route = function (req, res) {
    var data = req.body.data;
    var waterfall = [
        function (callback) {
            paper_service.create_service(data, function (err, doc) {
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
            paper_service.delete_service(conditions, function (err, doc) {
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
    // data.date = data.date ? new Date(data.date) : data.date;
    var conditions = req.body.conditions;
    var waterfall = [
        function (callback) {
            paper_service.update_service(conditions, data, function (err, doc) {
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
            paper_service.retrieve_service(conditions, field, function (err, doc) {
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
    var whereCondition = req.body.conditions;
    var populate = "";
    var fieldJson = "";
    var waterfall = [
        function (callback) {
            paper_service.pagination_service(options, fieldJson, populate, whereCondition, function (err, doc) {
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

var publish_paper_route = function (req, res) {
    var conditions = req.body.conditions;
    var paper = conditions._id;
    var waterfall = [
        function (callback) {
            paper_external_service.publish_service(paper, function (err) {
                if (err) {
                    callback(kit.response(common_response.code.system_error,
                        common_response.message.system_error, err));
                } else {
                    callback(null);
                }
            });
        },
        function (callback) {
            var data = {"publish_status": common_status.paper_publish_status.published};
            paper_service.update_service(conditions, data, function (err, doc) {
                if (err) {
                    callback(kit.response(common_response.code.system_error,
                        common_response.message.system_error, err));
                } else {
                    callback(null, doc);
                }
            });
        },
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
router.route('/publish_paper').post(publish_paper_route);
router.route('/pagination').post(pagination_route);
module.exports = router;
