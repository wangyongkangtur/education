
var async = require('async');
var jwt = require('jwt-simple');
var config = require('config');
var jwtTokenSecret = config.get('jwtTokenSecret');

var kit = {
    /**
     * 分页查询，该方法依赖`mongoose`组件
     * @param page 页数，如第1页，就传1
     * @param pageSize 每页大小，如一页展示10条，就传10
     * @param Model mongoose的指定Model对象
     * @param populate 关联查询
     * @param queryParams 查询条件
     * @param sortParams 排序
     * @param callback 回调函数
     */
    pageQuery : function (page, pageSize, Model, fieldJson, populate, queryParams, sortParams, callback) {
        var start = (page - 1) * pageSize;
        var $page = {};
        async.parallel({
            count: function (done) {  // 查询数量
                Model.count(queryParams).exec(function (err, count) {
                    done(err, count);
                });
            },
            records: function (done) {   // 查询一页的记录
                Model.find(queryParams, fieldJson).skip(start).limit(pageSize).populate(populate).sort(sortParams).exec(function (err, doc) {
                    done(err, doc);
                });
            }
        }, function (err, results) {
            var count = results.count;
            $page.total = count;
            $page.data = results.records;
            callback(err, $page);
        });
    },


    /**
     * 分页查询，该方法依赖`mongoose`组件
     * @param page 页数，如第1页，就传1
     * @param pageSize 每页大小，如一页展示10条，就传10
     * @param Model mongoose的指定Model对象
     * @param fieldJson 查询字段
     * @param populate 关联查询
     * @param queryParams 查询条件
     * @param sortParams 排序
     * @param callback 回调函数
     */
    pageQueryNew : function (page, pageSize, Model, fieldJson, populate, queryParams, sortParams, callback) {
        var start = (page - 1) * pageSize;
        var $page = {};
        async.parallel({
            count: function (done) {  // 查询数量
                Model.count(queryParams).exec(function (err, count) {
                    done(err, count);
                });
            },
            records: function (done) {   // 查询一页的记录
                Model.find(queryParams, fieldJson).skip(start).limit(pageSize).populate(populate).sort(sortParams).exec(function (err, doc) {
                    done(err, doc);
                });
            }
        }, function (err, results) {
            var count = results.count;
            $page.total = count;
            $page.data = results.records;
            callback(err, $page);
        });
    },
    /**
     * 将接口返回数据包装成固定格式的json对象
     *  @param success 消息状态，true/false
     * @param message 消息
     * @param result
     * @returns {{success: boolean, message: string, result:json}}
     */
    response : function(code, message, result){
        return {
            code : code,
            message : message,
            result : result
        };
    },

    /**
     * 获取当前登录用户
     * @param req
     * @returns {username|{type, index}|*|string}
     */
    getCurrentUser : function(req){
        var token = (req.body && req.body.access_token) ||
            (req.query && req.query.access_token) ||
            (req.cookies && req.cookies.access_token) ||
            req.headers['x-access-token'];
        var decoded = jwt.decode(token, jwtTokenSecret);
        return decoded.username;
    },
    /**
     * 串行方法执行的工具类
     * @param waterfalls 方法对象数组
     * @param callback 回调
     */
    waterfall : function(waterfalls, callback){
        async.waterfall(waterfalls.map(function(func){
            return function () {
                try {
                    return func.apply(this, arguments);
                }
                catch (err) {
                    return arguments[arguments.length - 1](err);
                }
            }
        }),callback);
    }
};


module.exports = kit;
