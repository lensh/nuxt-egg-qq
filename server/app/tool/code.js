// 状态码定义
const Code = {
    SUCCESS: 0,  // 成功
    DUPLICATE_KEY_ERROR: 11000,   // 失败,重复索引
    SEND_EMAIL_ERROR: -1,  // 发送邮箱验证码失败
    EMAIL_FORAMT_ERROR: -2,  // 邮箱格式错误
    EMIAL_VALID_CODEE_ERROR: -3,  // 验证码错误
    EMAIL_HAS_REGISTER: -4,  // 邮箱已经注册，注册用
    EMAIL_NOT_REGISTER: -5,  // 邮箱未注册
    PASSWORD_ERROR: -6, // 密码错误
    OPERATION_ERROR: -7, // 操作非法
    RESET_PASS_ERROR: -8, // 重置密码失败
    SYSTEM_ERROR: -9  // 系统异常
}

module.exports = Code