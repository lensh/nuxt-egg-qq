import Util from '../tool/util'

export const state = () => ({
    userInfo: {}  // 用户信息
})

export const mutations = {
    setUserInfo(state, info) {
        Util.setUserInfo(info)  // 设置localStorage
        state.userInfo = info
    }
}