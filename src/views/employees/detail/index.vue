<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="登录账户设置">
            <!-- 放置表单 -->
            <el-form ref="userForm" label-width="120px" style="margin-left: 120px; margin-top:30px" :model="user" :rules="rules">
              <el-form-item label="姓名:" prop="username">
                <el-input v-model="user.username" style="width:300px" />
              </el-form-item>
              <el-form-item label="密码:" prop="password2">
                <el-input v-model="user.password2" style="width:300px" type="password" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="updateUser">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情">
            <!-- <component :is="userComponent" /> -->

            <userComponent />
          </el-tab-pane>
          <el-tab-pane label="岗位信息">
            <JobInfo />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserDetailById } from '@/api/user'
import userComponent from '../components/user-info'
import JobInfo from '../components/job-info'
import { updateEmployess } from '@/api/employees'
export default {
  components: {
    userComponent,
    JobInfo
  },
  data() {
    return {
      userId: this.$route.params.id,
      user: {
        username: '',
        password2: ''
      },
      rules: {
        username: [
          { required: true, message: '员工姓名不能为空', trigger: 'blur' },
          { min: 2, max: 4, message: '员工姓名为2-4位' }
        ],
        password2: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 16, message: '密码为6-16位' }
        ]
      }
    }
  },
  created() {
    this.getUserDetailById()
  },
  methods: {
    async getUserDetailById() {
      this.user = await getUserDetailById(this.userId)
      this.user.password2 = '123456'
      console.log(this.user)
    },
    async updateUser() {
      try {
        await this.$refs.userForm.validate()
        await this.$confirm('确定要更新吗?')
        await updateEmployess({ ...this.user, password: this.user.password2 })
        this.$message.success('操作成功')
        this.getUserDetailById()
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>

</style>
