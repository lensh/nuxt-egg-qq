const BaseController = require('./base')
const sendEmail = require('../tool/email')
const Code = require('../tool/code')
const Util = require('../tool/util')

class UserController extends BaseController {
  // 注册
  async register() {
    const { ctx } = this
    this.ctx.body = await this.service.register(ctx.request.body)
  }
  // 登陆
  async login() {
    const { ctx } = this
    this.ctx.body = await this.service.login(ctx.request.body)
  }
  // 发送邮箱验证码
  async sendEmail() {
    const { ctx } = this

    // 检查邮箱
    const { email } = ctx.request.body
    if (!Util.checkEmail(email)) {
      ctx.body = {
        code: Code.EMAIL_FORAMT_ERROR,
        message: '邮箱格式错误'
      }
      return
    }
    // 生成邮箱验证码
    const validcode = this.createValidCode();

    // 邮箱和验证码放入session
    ctx.session.email = email
    ctx.session.validcode = validcode

    // 发送邮件
    let error
    let ret = await sendEmail(email, validcode).catch(err => { error = err })
    ctx.body = {
      code: ret ? Code.SUCCESS : Code.SEND_EMAIL_ERROR,
      message: ret ? '验证码发送成功，请查收' : '邮箱验证码发送失败，请检查邮箱是否正确'
    }
  }
  // 生成随机验证码
  createValidCode() {
    let validcode = ''
    for (var i = 0; i < 6; i++) {
      validcode += parseInt(Math.random() * 10, 10)
    }
    return validcode
  }

  // 检查验证码
  async checkValidCode() {
    const { ctx } = this
    // 拿到session里面的邮箱和验证码
    const { email: ctxEmail, validcode: ctxValidcode } = ctx.session
    // 检查邮箱和验证码
    const { email, validcode } = ctx.request.body
    if (email == ctxEmail && validcode == ctxValidcode) {
      ctx.body = {
        code: Code.SUCCESS,
        message: '验证码验证通过'
      }
    } else {
      ctx.body = {
        code: Code.EMIAL_VALID_CODEE_ERROR,
        message: '验证码错误'
      }
    }
  }

  // 找回密码
  async findpass() {
    const { ctx } = this
    this.ctx.body = await this.service.findpass(ctx.request.body)
  }

  // 检查邮箱是否注册
  async checkEmail() {
    const { ctx } = this
    this.ctx.body = await this.service.checkEmail(ctx.request.body)
  }
}

module.exports = UserController;