import request from '@/utils/request'

// 获取员工信息
export function getEmployeesInfo(params) {
  return request({
    url: '/sys/user',
    params
  })
}

// 删除员工
export function deleteEmployees(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}
