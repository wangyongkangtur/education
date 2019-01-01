var express = require('express');
var router = express.Router();
var user_service = require('./service/user.service');
var kit = require('../../common/util/kit');
var common_response = require('../../common/response');
var https = require('https');
var config = require('config');
var wx_appid = config.get('wx.appid');
var wx_secret = config.get('wx.secret');

var create_route = function (req, res) {
    var data = req.body.data;
    var waterfall = [
        function (callback) {
            user_service.create_service(data, function (err, doc) {
                if (err) {
                    callback(kit.response(common_response.code.system_error,
                        common_response.message.system_error, null));
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
            user_service.delete_service(conditions, function (err, doc) {
                if (err) {
                    callback(kit.response(common_response.code.system_error,
                        common_response.message.system_error, null));
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
            user_service.update_service(conditions, data, function (err, doc) {
                if (err) {
                    callback(kit.response(common_response.code.system_error,
                        common_response.message.system_error, null));
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
            user_service.retrieve_service(conditions, field, function (err, doc) {
                if (err) {
                    callback(kit.response(common_response.code.system_error,
                        common_response.message.system_error, null));
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
            user_service.pagination_service(options, fieldJson, populate, whereCondition, function (err, doc) {
                if (err) {
                    callback(kit.response(common_response.code.system_error,
                        common_response.message.system_error, null));
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


var login_route = function (req, res) {
    var data = req.body.data;
    var js_code = data.code;
    var waterfall = [
        function (callback) {
            https.get('https://api.weixin.qq.com/sns/jscode2session?appid=' +
                wx_appid + '&secret=' + wx_secret + '&js_code=' + js_code +
                '&grant_type=authorization_code', function(http_res){
                http_res.on('data', function(data) {
                    var result = JSON.parse(data.toString());
                    console.log(result);
                    if (result && result.openid) {
                        callback(null,result.openid);
                    } else {
                        res.json(kit.response(common_response.code.wx_openid_error,
                            common_response.message.wx_openid_error, result));
                    }
                });
            }).on('error', function(err){
                // console.error(err);
                res.json(kit.response(common_response.code.wx_openid_error,
                    common_response.message.wx_openid_error, err));
            }).end();
        },
        function (result, callback) {
        // {"session_key":"AJF3e4OpMgeu+Mt0t6fQxw==","openid":"oAYKH5BfmDSmQvKzXQLbMI0uz0NU"}
            var data = {"openid": result}
            user_service.retrieve_service(data, function (err, doc) {
                if (err) {
                    callback(kit.response(common_response.code.system_error,
                        common_response.message.system_error, null));
                } else {
                    if (doc && doc.length > 0) {
                        callback(null, doc[0]);
                    } else {
                        user_service.create_service(data, function (err, doc) {
                            if (err) {
                                callback(kit.response(common_response.code.system_error,
                                    common_response.message.system_error, null));
                            } else {
                                callback(null, doc);
                            }
                        });
                    }
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

router.route('/login').post(login_route);
router.route('/create').post(create_route);
router.route('/delete').post(delete_route);
router.route('/update').post(update_route);
router.route('/retrieve').post(retrieve_route);
router.route('/pagination').post(pagination_route);
module.exports = router;
