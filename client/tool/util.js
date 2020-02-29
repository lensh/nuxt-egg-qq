import crypto from 'crypto'

// Util工具库
const TOKEN_KEY = 'QQ_JWT_TOKEN'
const USER_KEY = 'QQ_USER_INFO'
const hash = (type, str) => crypto.createHash(type).update(str).digest('hex')
const sha1 = str => hash('sha1', str)

const Util = {
    // 检查邮箱
    checkEmail(email) {
        return /^[\w-]+@[\w-]+(\.[\w+]+)+$/.test(email)
    },
    // 防抖
    debounce(func, wait = 300) {
        // 缓存⼀个定时器id
        let timer = 0
        return function (...args) {
            if (timer) clearTimeout(timer)
            timer = setTimeout(() => {
                func.apply(this, args)
            }, wait)
        }
    },
    // 设置token
    setToken(token) {
        localStorage.setItem(TOKEN_KEY, token)
    },
    // 获取token
    getToken() {
        return localStorage.getItem(TOKEN_KEY)
    },
    // sha1双层加密
    encrypt(password) {
        const salt = 'abced@#4@%#$7%hfibh122@#$$R%^^&&*JN.?p'  // 盐值
        return sha1(salt + sha1(salt + password) + password)
    },
    // 设置用户信息
    setUserInfo(info) {
        localStorage.setItem(USER_KEY, JSON.stringify(info))
    },
    // 获取用户信息
    getUserInfo() {
        return localStorage.getItem(USER_KEY)
    }
}
export default Util