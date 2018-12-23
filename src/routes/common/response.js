/**
 * 功能响应函数
 * Date:2018-05-14
 * author:wangyk
 */
var message = {
    success:"请求成功",
    fail:"请求失败",
    invalid_parameters:"无效参数",
    system_error:"系统异常",

}

var code = {
    success:200,
    fail:-400,
    invalid_parameters:-1,
    system_error:-1,


}

module.exports = {
    "code": code,
    "message": message
}
