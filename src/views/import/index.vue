<template>
  <UploadExcel :on-success="importEmployee" />
</template>

<script>
import { importEmployess } from '@/api/employees'
export default {
  methods: {
    async importEmployee(data) {
      console.log(data)

      // 准备字典
      const dict = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '聘用形式': 'formOfEmployment',
        '部门': 'departmentName'
      }
      const arr = data.results.map(item => {
        return this.translate(item, dict)
      })
      // console.log(arr)

      try {
        await importEmployess(arr)
        this.$message.success('上传成功')
        this.$router.back()
        // setTimeout(() => {
        // }, 200)
      } catch (error) {
        // this.$message.error(error)
        // console.log(error)
        console.log(error)
      }
    },
    translate(item, dict) {
      const newUser = {}
      for (const key in item) {
        const enKey = dict[key]
        const value = item[key]
        if (enKey === 'timeOfEntry' || enKey === 'correctionTime') {
          newUser[enKey] = new Date(this.formatDate(value, '/'))
        } else {
          newUser[enKey] = value
        }
      }
      return newUser
    },
    formatDate(numb, format) {
      const time = new Date((numb - 1) * 24 * 3600000 + 1)
      time.setYear(time.getFullYear() - 70)
      const year = time.getFullYear() + ''
      const month = time.getMonth() + 1 + ''
      const date = time.getDate() - 1 + ''
      if (format && format.length === 1) {
        return year + format + month + format + date
      }
      return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
    }
  }
}
</script>

<style>

</style>
