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
/**
 * 修改员工信息
 **/

export function updateEmployess(data) {
  return request({
    url: '/sys/user/' + data.id,
    method: 'put',
    data
  })
}

/**
 *  获取员工个人信息
 * **/
export function getPersonalInfo(id) {
  return request({
    url: `/employees/${id}/personalInfo`
  })
}

/** *
 *  更新用户详情的基础信息
 * **/
export function updatePersonal(data) {
  return request({
    url: `/employees/${data.userId}/personalInfo`,
    method: 'put',
    data
  })
}

/** **
 * 获取用户的岗位信息
 *
 * ****/
export function getJobDetail(id) {
  return request({
    url: `/employees/${id}/jobs`
  })
}

/**
 * 保存岗位信息
 * ****/
export function updateJob(data) {
  return request({
    url: `/employees/${data.userId}/jobs`,
    method: 'put',
    data
  })
}
