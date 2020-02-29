const BaseService = require('./base')
const Code = require('../tool/code')

class UserService extends BaseService {
    // 注册
    async register(data) {
        let error
        // 查询该邮箱是否已经注册
        let ret = await this.model.findOne({ email: data.email });
        if (ret) {
            return {
                code: Code.EMAIL_HAS_REGISTER,
                message: '该邮箱已经注册，请换用其它邮箱'
            }
        }
        ret = await this.model.create(data).catch(err => { error = err })
        if (ret) {
            return {
                code: Code.SUCCESS,
                message: '恭喜您注册成功',
            }
        }
        if (error.code == Code.DUPLICATE_KEY_ERROR) {
            return {
                code: Code.DUPLICATE_KEY_ERROR,
                message: '该邮箱已注册，请使用其他邮箱注册'
            }
        } else {
            return {
                code: Code.SYSTEM_ERROR,
                message: '注册失败'
            }
        }
    }
    // 登陆
    async login(data) {
        const { ctx } = this
        const { email, password } = data;

        // 查找该邮箱是否已经注册
        let ret = await this.model.findOne({ email });
        if (!ret) {
            return {
                code: Code.EMAIL_NOT_REGISTER,
                message: '该邮箱尚未注册，请先注册'
            }
        }
        if (password != ret.password) {
            return {
                code: Code.PASSWORD_ERROR,
                message: '密码错误'
            }
        }
        return {
            code: Code.SUCCESS,
            message: '登录成功',
            data: {
                token: ctx.app.jwt.sign(data, ctx.app.config.jwt.secret),
                userinfo: {
                    email: ret.email,
                    nick: ret.nick,
                    _id: ret._id
                }
            }
        }
    }
    // 找回密码
    async findpass(data) {
        // 从session里面读取出email
        const { ctx } = this
        const { email, password } = data
        const { email: ctxEmail } = ctx.session

        // 校验用户传过来的email和session的email是否相等
        if (email != ctxEmail) {
            return {
                code: Code.OPERATION_ERROR,
                message: '操作非法'
            }
        }

        let error
        let ret = await this.model.update({ email }, { $set: { password } }).catch(err => { error = err })
        if (error) {
            return {
                code: Code.RESET_PASS_ERROR,
                message: '修改密码失败',
            }
        }
        return {
            code: Code.SUCCESS,
            message: '恭喜您修改密码成功'
        }
    }
    // 检查邮箱是否注册
    async checkEmail(data) {
        let ret = await this.model.findOne({ email: data.email });
        if (!ret) {
            return {
                code: Code.EMAIL_NOT_REGISTER,
                message: '该邮箱尚未注册，请先注册'
            }
        }
        return {
            code: Code.SUCCESS,
            message: '校验通过'
        }
    }
}

module.exports = UserService;