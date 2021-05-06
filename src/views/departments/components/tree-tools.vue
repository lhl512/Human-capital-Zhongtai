<template>
  <div class="treeTools" style="width:100%">
    <el-row type="flex" justify="space-between" align="middle" style="width:100%;height: 40px">
      <el-col>
        <strong v-if="isRoot"><i class="el-icon-office-building" />{{ treeNoods.name }}</strong>
        <span v-else>{{ treeNoods.name }}</span>
      </el-col>
      <el-col :span="4">
        <el-row type="flex" justify="end">
          <!-- 两个内容 -->
          <el-col>{{ treeNoods.manager }}</el-col>
          <el-col>
            <!-- 下拉菜单 element -->
            <el-dropdown>
              <span>
                操作<i class="el-icon-arrow-down" />
              </span>
              <!-- 下拉菜单 -->
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>添加子部门</el-dropdown-item>
                <el-dropdown-item v-if="!isRoot">编辑部门</el-dropdown-item>
                <el-dropdown-item v-if="!isRoot">删除部门</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    treeNoods: {
      type: Object,
      required: true
    },
    isRoot: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style>

</style>
