<template>
  <!-- 新增部门的弹层 -->
  <el-dialog title="新增部门" :visible="showAddDept">
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model.trim="formData.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model.trim="formData.code" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="formData.manager" style="width:80%" placeholder="请选择" @focus="getUserSimle">
          <el-option v-for="item in userSimle" :key="item.id" :value="item.username" :label="item.username" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model.trim="formData.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <!-- 列被分为24 -->
      <el-col :span="6">
        <el-button type="primary" size="small">确定</el-button>
        <el-button size="small">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>

</template>

<script>
import { getDepartments } from '@/api/departments'
import { getUserSimle } from '@/api/user'
export default {
  props: {
    showAddDept: {
      type: Boolean,
      default: false
    },
    treeNodes: {
      type: Object,
      required: true
    }
  },
  data() {
    const checkRepeatName = async(rule, value, callback) => {
      // 同一部门下不能有重名
      // 1. 所有部门列表
      const { depts } = await getDepartments()
      // 2. 当前被点击作为父部门的那个id
      // const parent = this.treeNode
      // 3. 当前用户正在输入的值
      // value
      const isRepeat = depts.filter(item => item.pid === this.treeNodes.id)
        .some(item => item.name === value)
      isRepeat ? callback(new Error('同部门下不能重名')) : callback()
    }
    const checkRepeatCode = async(rule, value, callback) => {
      const { depts } = await getDepartments()
      const isRepeat = depts.some(item => item.code === value)
      isRepeat ? callback(new Error('部门代码不能重复')) : callback()
    }
    return {
      userSimle: [],
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      rules: {
        name: [
          { required: true, message: '该项不能为空', trigger: 'blur' },
          { trigger: 'blur', max: 50, message: '最多输入50位字符' },
          { trigger: 'blur', validator: checkRepeatName }
        ],
        code: [
          { required: true, message: '该项不能为空', trigger: 'blur' },
          { trigger: 'blur', max: 50, message: '最多输入50位字符' },
          { trigger: 'blur', validator: checkRepeatCode }

        ],
        manager: [
          { required: true, message: '该项不能为空', trigger: 'blur' }
        ],
        introduce: [
          { required: true, message: '该项不能为空', trigger: 'blur' },
          { trigger: 'blur', max: 300, message: '最多输入300位字符' }
        ]
      }
    }
  },
  methods: {
    async  getUserSimle() {
      this.userSimle = await getUserSimle()
    }
  }
}
</script>

<style>

</style>
