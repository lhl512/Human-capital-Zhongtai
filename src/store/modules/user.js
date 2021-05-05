import { login } from '@/api/user'
import { setToken, getToken } from '@/utils/auth'
const state = {
  token: getToken()
}
const mutations = {
  setToken(state, data) {
    setToken(data)
    state.token = data
  },
  removeToken(state) {
    state.token = null
  }
}

const actions = {
  async login(store, data) {
    const res = await login(data)
    console.log(res)

    const token = res.data.data
    store.commit('setToken', token)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
