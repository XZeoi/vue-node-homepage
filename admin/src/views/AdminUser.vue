<template>
  <div class="admin-user">
    <h2>管理员账号管理</h2>
    <div class="create-area">
      <router-link to="/admin_users/create">新增账号</router-link>
    </div>
    <div class="admin-user-list">
      <el-table :data="datas">
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="$router.push(`/admin_users/${scope.row._id}`)">编辑</el-button>
            <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="create-dialog">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      datas: []
    }
  },
  watch: {
    // 监听路由变化，当ArticleDialog.vue组件保存文章后，跳转回当前路由时，需要更新文章列表
    $route(to, from) {
      this.fetch()
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("rest/admin_users")
      this.datas = res.data
    }
  }
}
</script>

<style>

</style>