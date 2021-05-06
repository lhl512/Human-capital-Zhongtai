import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
import { getTime } from '@/utils/auth'
const checkTimeout = () => {
  const currentTime = (new Date()).getTime()
  const loginTime = getTime()
  const duration = 1000 * 60 * 60 * 2
  return currentTime - loginTime > duration
}
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// 请求拦截器
service.interceptors.request.use(config => {
  // 注入token
  if (store.getters.token) {
    if (checkTimeout()) {
      store.dispatch('user/loginout')
      router.push('/login')
      return Promise.reject(new Error('token 已超时'))
    } else {
      config.headers['Authorization'] = `Bearer ${store.getters.token}`
    }
  }
  return config
}, error => {
  return Promise.reject(error)
}
)

// 响应拦截器
// use 函数可以接收2个参数
// 第一个是成功的回调，第二个是失败的回调
service.interceptors.response.use(res => {
  // 网络层面的成功

  const { data, success, message } = res.data
  if (success) {
    // 数据层面成功
    return data
  } else {
    // 数据层面出错
    Message.error(message)
    return Promise.reject(new Error(message))
  }
}, err => {
  // 网络请求层面的失败
  if (err.response && err.response.data && err.response.data.code === 10002) {
    store.dispatch('user/loginout')
    router.push('/login')
  }
  Message.error(err.message)
  return Promise.reject(err)
}
)

export default service
