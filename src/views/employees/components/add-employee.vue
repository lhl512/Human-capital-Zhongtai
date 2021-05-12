<template>
  <el-dialog title="新增员工" :visible="showDialog" @close="btnCancel">
    <!-- 表单 -->
    <el-form ref="addEmployee" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="formData.username" style="width:50%" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="formData.mobile" style="width:50%" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker v-model="formData.timeOfEntry" style="width:50%" placeholder="请选择入职时间" />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select v-model="formData.formOfEmployment" style="width:50%" placeholder="请选择">
          <!-- 遍历只能遍历组件的数据 -->
          <el-option v-for="item in EmployeeEnum.hireType" :key="item.id" :label="item.value" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input v-model="formData.workNumber" style="width:50%" placeholder="请输入工号" />
      </el-form-item>
      <el-form-item ref="dName" label="部门" prop="departmentName">
        <el-input v-model="formData.departmentName" style="width:50%" placeholder="请选择部门" @focus="getDepartments" @blur="checkDepartmentName" />
        <!-- 放置一个tree组件 -->
        <el-tree
          v-if="showTree"
          v-loading="loading"
          :data="treeData"
          default-expand-all=""
          :props="{ label: 'name' }"
          @node-click="selectNode"
        />
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker v-model="formData.correctionTime" style="width:50%" placeholder="请选择转正时间" />
      </el-form-item>
    </el-form>
    <!-- footer插槽 -->
    <template v-slot:footer>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" @click="btnCancel">取消</el-button>
          <el-button type="primary" size="small" @click="btnOK">确定</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
import EmployeeEnum from '@/api/constant/employees'
import { getDepartments } from '@/api/departments'
import { listToTreeData } from '@/utils'
import { addEmployess } from '@/api/employees'

export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      EmployeeEnum,
      formData: {
        username: '',
        mobile: '',
        timeOfEntry: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        correctionTime: ''
      },
      rules: {
        username: [
          { required: true, message: '员工姓名不能为空', trigger: 'blur' },
          { min: 2, max: 4, message: '员工姓名为2-4位' }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattern: /^1[35789]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' }
        ],
        timeOfEntry: [
          { required: true, message: '入职时间不能为空', trigger: 'blur' }
        ],
        formOfEmployment: [
          { required: true, message: '聘用形式不能为空', trigger: 'blur' }

        ],
        workNumber: [
          { required: true, message: '工号不能为空', trigger: 'blur' }
          // { trigger: 'blur', validator: checkRepeatWorkNumber }
        ],
        departmentName: [
          { required: true, message: '部门不能为空', trigger: 'blur' }
        ]
        // correctionTime: [
        //   { required: true, message: '转正时间不能为空', trigger: 'blur' }
        // ]
      },
      treeData: [],
      showTree: false,
      loading: false
    }
  },
  methods: {
    // 格式化聘用形式

    btnCancel() {
      this.$emit('update:showDialog', false)
      this.formData = {
        username: '',
        mobile: '',
        timeOfEntry: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        correctionTime: ''
      }
      this.$refs.addEmployee.resetFields()
    },
    async btnOK() {
      try {
        await this.$refs.addEmployee.validate()
        await addEmployess(this.formData)
        this.$message.success('操作成功')
        this.$parent.getEmployeesInfo()
        this.$emit('update:showDialog', false)
        // this.$emit('addEmployess')
      } catch (error) {
        console.log(error)
      }
    },
    async getDepartments() {
      this.showTree = true
      this.loading = true
      const { depts } = await getDepartments()
      this.treeData = listToTreeData(depts, '')
      this.loading = false
    },
    selectNode(val, node, dom) {
      this.formData.departmentName = val.name
      // console.log(val.name)
      // console.log(node, dom)
      this.$refs.dName.clearValidate()
      this.showTree = false
    },
    checkDepartmentName() {
      setTimeout(() => {
        this.$refs.addEmployee.validateField('departmentName')
      }, 200)
    }
  }
}
</script>

<style>

</style>
