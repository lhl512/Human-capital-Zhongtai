<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools :show-before="true">
        <span slot="before">共166条记录</span>
        <template slot="after">
          <el-button size="small" type="warning">导入</el-button>
          <el-button size="small" type="danger">导出</el-button>
          <el-button size="small" type="primary" @click="showDialog =true">新增员工</el-button>
        </template>
      </page-tools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table border :data="list">
          <el-table-column label="序号" sortable="" type="index" />
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
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="deleteEmployees(row.id)">删除</el-button>
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
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.page.page = val
      this.getEmployeesInfo()
      console.log(`当前页: ${val}`)
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
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>

</style>
