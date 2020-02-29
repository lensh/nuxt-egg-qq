// 通用参数定义
const moment = require('moment')

module.exports = {
    createdAt: {
        type: String,
        default: () => moment(new Date()).format('YYYY/MM/DD HH:mm:ss'),
    },
    updatedAt: {
        type: String,
        default: () => moment(new Date()).format('YYYY/MM/DD HH:mm:ss'),
    }
};