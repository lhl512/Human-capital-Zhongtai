<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <!-- 用了一个行列布局 -->
        <TreeTools :tree-noods="company" :is-root="true" @addDepts="addDepts" />
        <hr>
        <el-tree :data="departs" :props="{label:'name'}" :default-expand-all="true" :expand-on-click-node="false">
          <template #default="scoped">
            <TreeTools :tree-noods="scoped.data" :is-root="false" @delDepartments="getDepartments" @addDepts="addDepts" @editDepts="editDepts" />
          </template>

        </el-tree>
      </el-card>
      <AddDept
        ref="addDept"
        :show-add-dept.sync="showAddDept"
        :tree-nodes="treeNodes"
        @addDepartments="getDepartments"
      />
    </div>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools'
import { getDepartments } from '@/api/departments'
import { listToTreeData } from '@/utils'
import AddDept from './components/add-dept'
export default {
  components: {
    TreeTools,
    AddDept
  },
  data() {
    return {
      company: { name: '江苏传智播客教育科技股份有限公司', manager: '负责人', id: '' },
      departs: [],
      defaultProps: {
        label: 'name' // 表示 从这个属性显示内容
      },
      showAddDept: false,
      treeNodes: {}
    }
  },
  mounted() {
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
      const res = await getDepartments()
      // console.log(res)
      this.departs = listToTreeData(res.depts, '')
    },
    addDepts(treeNodes) {
      this.showAddDept = true
      this.treeNodes = treeNodes
    },
    editDepts(treeNodes) {
      this.showAddDept = true
      this.treeNodes = treeNodes
      this.$refs.addDept.getDepartmentDetail(treeNodes.id)
    }
  }

}
</script>
<style scoped>
.tree-card {
  padding: 30px  140px;
  font-size:14px;
}
</style>
