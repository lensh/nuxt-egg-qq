const { Service } = require('egg');

// 基础service类，加model属性，该属性是子service所对应的model实例，方便子类通过this.model
// 去操作对应的集合
class BaseService extends Service {
    constructor(ctx) {
        super(ctx);
        // 获取子service的类名
        const name = this.constructor.name.replace('Service', '');
        // 获取子service所对应的model实例
        this.model = ctx.model[name];
    }
}

module.exports = BaseService;