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
// 新增员工
export function addEmployess(data) {
  return request({
    url: '/sys/user',
    method: 'post',
    data
  })
}

// 批量导入员工
export function importEmployess(data) {
  return request({
    url: '/sys/user/batch',
    method: 'post',
    data
  })
}
