import request from '@/utils/request'

// 获取员工信息
export function getEmployeesInfo(params) {
  return request({
    url: '/sys/user',
    params
  })
}
