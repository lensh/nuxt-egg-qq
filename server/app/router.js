'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const jwt = app.middleware.jwt({ app });
  /*
  router.group({ name: 'user', prefix: '/user' }, router => {
    router.get('/', jwt, controller.user.index);
  });
  router.get('/', controller.home.index);
  */
  // 用户登录、注册、发邮箱验证码、检查验证码、找回密码
  router.group({ name: 'user', prefix: '/user' }, router => {
    router.post('/register', controller.user.register)
    router.post('/findpass', controller.user.findpass)
    router.post('/checkemail', controller.user.checkEmail)
    router.post('/sendEmail', controller.user.sendEmail)
    router.post('/checkValidCode', controller.user.checkValidCode)
    router.post('/login', controller.user.login)
  });
};