<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="角色管理" name="first">
            <!-- 新增角色按钮 -->
            <el-row style="height:60px">
              <el-button
                icon="el-icon-plus"
                size="small"
                type="primary"
              >新增角色</el-button>
            </el-row>
            <!-- 表格 -->
            <el-table :border="true" :data="roleList">
              <el-table-column label="序号" width="120" type="index" />
              <el-table-column label="角色名称" width="240" prop="name" />
              <el-table-column label="描述" prop="description" />
              <el-table-column label="操作">
                <el-button size="small" type="success">分配权限</el-button>
                <el-button size="small" type="primary">编辑</el-button>
                <el-button size="small" type="danger" @click="deleteRole">删除</el-button>
              </el-table-column>
            </el-table>
            <!-- 分页组件 -->
            <el-row type="flex" justify="center" align="middle" style="height: 60px">
              <!-- 分页组件 -->
              <el-pagination
                :current-page.sync="currentPage1"
                :page-size="3"
                layout="prev, pager, next"
                :total="params.total"
                @current-change="handleCurrentChange"
                @next-click="nextBtn"
                @prev-click="prevBtn"
              />
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="公司信息" name="second">
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              show-icon
              :closable="false"
            />
            <el-form label-width="120px" style="margin-top:50px">
              <el-form-item label="公司名称">
                <el-input v-model="formData.name" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input v-model="formData.companyAddress" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="formData.mailbox" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="formData.remarks" type="textarea" :rows="3" disabled style="width:400px" />
              </el-form-item>
            </el-form></el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getRoleList, getCompanyInfo, deleteRole } from '@/api/setting'
export default {
  data() {
    return {

      currentPage1: 1,
      activeName: 'first',
      params: {
        page: 1,
        pagesize: 3,
        total: ''
      },
      roleList: [],
      formData: {
        name: '',
        companyAddress: '',
        mailbox: '',
        remarks: ''

      }
    }
  },
  created() {
    this.getRoleList()
    this.getCompanyInfo()
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    handleCurrentChange(val) {
      this.params.page = val
      this.getRoleList()
      console.log(`当前页: ${val}`)
    },
    // 获取角色信息
    async getRoleList() {
      const { total, rows } = (await getRoleList(this.params))
      this.params.total = total
      this.roleList = rows
      console.log(this.params.total)
    },
    // 上一页
    prevBtn() {
      this.params.page--
      this.getRoleList()
    },
    // 下一页
    nextBtn() {
      this.params.page++
      this.getRoleList()
    },
    // 获取公司信息
    async getCompanyInfo() {
      this.formData = await getCompanyInfo(this.$store.state.user.userInfo.companyId)
      // console.log(this.formData)
    },
    // 删除角色
    async deleteRole() {
      const res = await deleteRole(this.roleList.id)
      console.log(res)
    }
  }
}
</script>

<style>

</style>
