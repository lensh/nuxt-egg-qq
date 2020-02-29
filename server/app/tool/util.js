// Util工具库
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
    }
}
module.exports = Util