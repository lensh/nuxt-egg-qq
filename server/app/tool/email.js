// 发送邮件
const nodemailer = require('nodemailer');

//创建一个SMTP客户端配置
const transporter = nodemailer.createTransport({
    host: 'smtp.qq.com', // QQ邮箱 host
    port: 465, // smtp 端口
    secureConnection: true,
    auth: {
        user: '986992484@qq.com', // 发送邮件的邮箱名
        pass: 'vdruxnxzuvntbbac', // 邮箱的授权码，也可以使用邮箱登陆密码
    },
})

// 发送邮件
const sendEmail = (toUser, validcode) => {
    return new Promise((reslove, reject) => {
        transporter.sendMail({
            from: '986992484@qq.com', // 发送人邮箱
            to: toUser, // 接收人邮箱，多个使用数组或用逗号隔开
            subject: '欢迎您注册QQ', // 主题
            html: `<div>欢迎您使用QQ，您的验证码为：${validcode}</div>`, // 邮件正文 
        }, (err, info = {}) => {
            if (err) {
                reject(err)
            } else {
                reslove(info)
            }
        })
    })
}
module.exports = sendEmail