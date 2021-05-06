import { login, getUserInfo, getUserDetailById } from '@/api/user'
import { setToken, getToken, removeToken, setTiem } from '@/utils/auth'
const state = {
  token: getToken(),
  userInfo: {}
}
const mutations = {
  // 设置token
  setToken(state, data) {
    setToken(data)
    state.token = data
  },
  // 删除token
  removeToken(state) {
    state.token = null
    removeToken()
  },
  // 设置用户信息
  setUserInfo(state, userInfo) {
    state.userInfo = { ...userInfo }
  },
  // 删除用户信息
  removeUserInfo(state) {
    state.userInfo = {}
  }
}

const actions = {
  // 登录
  async login(store, data) {
    const res = await login(data)
    try {
      console.log('这里成功了')

      console.log(res)

      // const token = res.data.data
      store.commit('setToken', res)
      setTiem()
    } catch (error) {
      console.log('这里报错了')
      console.log(error)
    }
  },
  // 获取用户数据
  async getUserInfo(store) {
    const res = await getUserInfo()
    // console.log(res.userId)
    const detail = await getUserDetailById(res.userId)
    // console.log(detail)
    const data = { ...res, ...detail }
    store.commit('setUserInfo', data)
    console.log(data)

    return data
  },
  // 退出
  loginout(store) {
    store.commit('removeToken')
    store.commit('removeUserInfo')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
