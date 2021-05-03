<template>
  <div>
    <el-form :model="formData" :rules="rules">
      <el-form-item label="手机号" prop="username">
        <el-input v-model="formData.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="formData.password" />
      </el-form-item>
      <el-form-item label="确认密码" prop="password2">
        <el-input v-model="formData.password2" />
      </el-form-item>
      <el-button>登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {

  data() {
    const checkPassword2 = (rule, value, callback) => {
      // 如果给了一个自定义校验函数
      // 饿了么在校验时会自动调用, 并且传入三个参数
      // rule 规则对象
      // value 用户输入的值
      // callback 放行的回调函数
      // 我们可以自行写逻辑校验对错
      // 如果认为正确, 则直接执行 callback()
      // 如果认为不正确, 运行 callback 的时候 传入一个原生的错误对象 new Error('两次密码必须相同')
      // if (value === this.formData.password) {
      //   callback()
      // } else {
      //   callback(new Error('两次密码必须相同'))
      // }
      value === this.formData.password ? callback() : callback(new Error('两次密码必须相同'))
    }
    return {
      formData: {
        username: '',
        password: '',
        password2: ''
      },
      rules: {
        username: [{
          required: true, message: '该项不能为空', trigger: 'blur'
        }, { pattern: /^1[35789]\d{9}$/, message: '请输入合法的手机号', trigger: 'blur' }],
        password: [{
          required: true, message: '该项不能为空', trigger: 'blur'
        }, { min: 6, max: 16, message: '密码长度在6-16之间', trigger: 'blur' }],
        password2: [{
          required: true, message: '该项不能为空', trigger: 'blur'
        }, { trigger: 'blur', validator: checkPassword2 }]
      }
    }
  }
}
</script>

<style>

</style>
