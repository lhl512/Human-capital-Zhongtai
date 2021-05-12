<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools :show-before="false">
        <!-- <span slot="before">共166条记录</span> -->
        <template slot="after">
          <el-button size="small" type="warning" @click="$router.push('/import')">导入</el-button>
          <el-button size="small" type="danger" @click="exportEmployees">导出</el-button>
          <el-button size="small" type="primary" @click="showDialog =true">新增员工</el-button>
        </template>
      </page-tools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table border :data="list">
          <el-table-column label="序号" sortable="" type="index">
            <template slot-scope="scope">
              {{ (page.page -1) * page.size + (scope.$index+1) }}
            </template>
          </el-table-column>
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="工号" sortable="" prop="workNumber" />
          <el-table-column
            label="聘用形式"
            sortable=""
            :formatter="formatEmployment"
            prop="formOfEmployment"
          />
          <el-table-column label="部门" sortable="" prop="departmentName" />
          <el-table-column label="入职时间" sortable="" prop="timeOfEntry">
            <template slot-scope="{row}">{{ row.timeOfEntry | formatDate }}</template>
          </el-table-column>
          <el-table-column label="账户状态" sortable="" prop="enableState">
            <template slot-scope="{row}">
              <el-switch :value="row.enableState ===1" />
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template slot-scope="{row}">
              <el-button type="text" size="small" @click="$router.push(`/employees/detail/${row.id}`)">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" style="color:#ccc" @click="deleteEmployees(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row type="flex" justify="center" align="middle" style="height: 60px">
          <el-pagination
            :current-page="currentPage"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="page.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            @prev-click="handlePrev"
            @next-click="handleNext"
          > />
          </el-pagination></el-row>
      </el-card>
      <addEmployee :show-dialog.sync="showDialog" />
    </div>
  </div>
</template>

<script>
import EmployeeEnum from '@/api/constant/employees'
import { getEmployeesInfo, deleteEmployees } from '@/api/employees'
import addEmployee from './components/add-employee'
import { formatDate } from '@/filters'
export default {
  components: {
    addEmployee
  },
  data() {
    return {
      showDialog: false,
      currentPage: 1,
      list: [],
      page: {
        page: 1,
        size: 5,
        total: 0
      }

    }
  },
  created() {
    this.getEmployeesInfo()
  },
  methods: {
    async getEmployeesInfo() {
      const { total, rows } = await getEmployeesInfo(this.page)
      this.page.total = total
      this.list = rows
      // console.log(rows)
    },
    handleSizeChange(val) {
      this.page.size = val
      this.getEmployeesInfo()
      // console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.page.page = val
      this.getEmployeesInfo()
      // console.log(`当前页: ${val}`)
    },
    handlePrev() {
      this.page.page++
      this.getEmployeesInfo()
    },
    handleNext() {
      this.page.page--
      this.getEmployeesInfo()
    },
    // 格式化聘用形式
    formatEmployment(row, column, cellValue, index) {
      // console.log(row, column, cellValue, index)
      const obj = EmployeeEnum.hireType.find(item => item.id === cellValue)
      return obj ? obj.value : '未知'
    },
    // 删除
    async  deleteEmployees(id) {
      try {
        await this.$confirm('确认要删除该员工吗?')
        await deleteEmployees(id)
        this.getEmployeesInfo()
        this.$message.success('删除员工成功!')
        if (this.list.length === 1 && this.page.page > 1) {
          this.page.page--
        }
      } catch (error) {
        console.log(error)
      }
    },
    async  exportEmployees() {
      const { rows } = await getEmployeesInfo({ page: 1, size: this.page.total })
      const dict = {
        '姓名': 'username',
        '手机号': 'mobile',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }

      const userData = rows.map(user => {
        return this.object2Arrayy(user, dict)
      })
      console.log(userData)

      const { export_json_to_excel } = await import('@/vendor/Export2Excel')
      console.log(export_json_to_excel)
      export_json_to_excel({
        header: Object.keys(dict),
        data: userData
      })
    },
    object2Arrayy(user, dict) {
      const newUser = []
      for (const key in dict) {
        const enKey = dict[key]
        if (enKey === 'formOfEmployment') {
          // console.log(enKey)
          // user[enKey] === 1 ? user[enKey] = '正式' : user[enKey] = '非正式'
          const obj = EmployeeEnum.hireType.find(obj => obj.id === user[enKey])
          obj ? user[enKey] = obj.value : user[enKey] = '未知'
        } else if (enKey === 'timeOfEntry' || enKey === 'correctionTime') {
          user[enKey] = formatDate(user[enKey])
        }
        const value = user[enKey]
        newUser.push(value)
      }
      return newUser
    }
  }
}
</script>

<style>

</style>
