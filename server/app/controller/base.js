const { Controller } = require('egg');

// 基础controller类，加service属性，该属性是子controller所对应的service实例，方便子类通
// 过this.service去调用对应的service
class BaseController extends Controller {
    constructor(ctx) {
        super(ctx);
        // 获取子controller的类名
        const name = this.constructor.name.replace('Controller', '');
        // 获取子controller所对应的service实例
        this.service = ctx.service[name.toLowerCase()];
    }
}
module.exports = BaseController;