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
                @click="showDialog = true"
              >新增角色</el-button>
            </el-row>
            <!-- 表格 -->
            <el-table :border="true" :data="roleList">
              <el-table-column label="序号" width="120" type="index" />
              <el-table-column label="角色名称" width="240" prop="name" />
              <el-table-column label="描述" prop="description" />
              <el-table-column label="操作">
                <template slot-scope="{row}">
                  <el-button size="small" type="success">分配权限</el-button>
                  <el-button size="small" type="primary" @click="editRole(row.id)">编辑</el-button>
                  <el-button size="small" type="danger" @click="deleteRole(row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页组件 -->
            <el-row type="flex" justify="center" align="middle" style="height: 60px">
              <!-- 分页组件 -->
              <el-pagination
                :current-page.sync="currentPage1"
                :page-size="params.pagesize"
                :page-sizes="[2, 3, 4, 5]"
                layout="total,sizes,prev, pager, next,jumper"
                :total="params.total"
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
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
        <el-dialog :title="roleForm.id?'编辑角色':'新增角色'" :visible="showDialog" @close="btnCancel">
          <el-form ref="roleForm" :model="roleForm" :rules="rules" label-width="120px">
            <el-form-item label="角色名称" prop="name">
              <el-input v-model="roleForm.name" />
            </el-form-item>
            <el-form-item label="角色描述" prop="description">
              <el-input v-model="roleForm.description" />
            </el-form-item>
          </el-form>
          <!-- 底部 -->
          <el-row slot="footer" type="flex" justify="center">
            <el-col :span="6">
              <el-button size="small" @click="btnCancel">取消</el-button>
              <el-button size="small" type="primary" @click="btnOK">确定</el-button>
            </el-col>
          </el-row>
        </el-dialog>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getRoleList, getCompanyInfo, deleteRole, addRole, getRoleInfo, updateRole } from '@/api/setting'
export default {
  data() {
    return {
      roleForm: {
        name: '',
        description: ''
      },
      showDialog: false,
      currentPage1: 1,
      activeName: 'first',
      params: {
        page: 1,
        pagesize: 2,
        total: 0
      },
      roleList: [],
      formData: {
        name: '',
        companyAddress: '',
        mailbox: '',
        remarks: ''

      },
      rules: {
        name: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '角色描述不能为空', trigger: 'blur' }
        ]
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
    handleSizeChange(val) {
      this.params.pagesize = val
      this.getRoleList()
      // console.log(val)
    },
    handleCurrentChange(val) {
      this.params.page = val
      this.getRoleList()
      // console.log(`当前页: ${val}`)
    },
    // 获取角色信息
    async getRoleList() {
      const { total, rows } = (await getRoleList(this.params))
      this.params.total = total
      this.roleList = rows
      console.log(this.roleList)
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
    deleteRole(id) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        try {
          await deleteRole(id)
          this.getRoleList()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        } catch (error) {
          console.log(error)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 编辑页面显示
    async  editRole(id) {
      this.showDialog = true
      this.roleForm = await getRoleInfo(id)
      // console.log(res)
    },
    btnCancel() {
      this.showDialog = false
      this.roleForm = {
        name: '',
        description: ''
      }
      // 移除校验
      this.$refs.roleForm.resetFields()
    },
    // 新增+编辑
    async btnOK() {
      try {
        await this.$refs.roleForm.validate()

        if (this.roleForm.id) {
          // 编辑
          await updateRole(this.roleForm)
        } else {
          // 新增
          await addRole(this.roleForm)
        }
        this.getRoleList()
        this.$message.success('操作成功')
        this.showDialog = false
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>

</style>
