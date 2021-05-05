import request from '@/utils/request'
// 登录
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}
// 获取用户数据
export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}
// 根据id获取用户详情
export function getUserDetailById(id) {
  return request({
    url: `/sys/user/${id}`
  })
}
export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
