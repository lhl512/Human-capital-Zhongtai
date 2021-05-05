import axios from 'axios'
import { Message } from 'element-ui'
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
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
  Message.error(err.message)
  return Promise.reject(err)
}
)

export default service
