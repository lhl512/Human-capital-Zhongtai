import { login } from '@/api/user'
const state = {
  token: null
}
const mutations = {
  setToken(state, data) {
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
