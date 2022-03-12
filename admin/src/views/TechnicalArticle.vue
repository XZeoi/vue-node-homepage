<template>
  <div class="technical-article">
    <h2>技术文章</h2>
    <div class="article-create-area">
      <!-- <el-button type="primary" @click="isCreateStatus = true"
        >新增文章</el-button
      > -->
      <router-link to="/technical_articles/create">新增文章</router-link>
    </div>

    <div class="article-lists-area">
      <el-table :data="articles"> 
        <el-table-column prop="_id" label="ID" width="240"></el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="mainTag.name" label="标签"></el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="scope">
            <el-button
            type="text"
            size="small"
            @click="$router.push(`/technical_articles/edit/${scope.row._id}`)"
          >编辑</el-button>
          <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div>
      <router-view></router-view>
      <!-- <article-dialog :isCreateStatus="isCreateStatus" @dialogClose="dialogClose"></article-dialog> -->
    </div>
    
  </div>
</template>

<script>

export default {
  data() {
    return {
      isCreateStatus: false,

      // 当前文章id
      id: "",
      articles: [],
    };
  },
  watch: {
    $route(to, from) {
      this.articlesFetch()
    }
  },

  computed: {

  },
  created() {
    // 拉取文章列表
    this.articlesFetch()
    console.log(' created钩子函数');
  },
  methods: {
    // 子组件的状态改变，只有通过事件来影响父组件的状态，不可以直接通过子组件更改而改变父组件状态。
    dialogClose() {
      this.isCreateStatus = false
    },
    // 拉取文章列表
    async articlesFetch() {
      const res = await this.$http.get('rest/technical_articles')
      this.articles = res.data
    },
    // 删除目标文章
    remove(row) {
      this.$confirm(`是否确定要删除文章 "${row.title}"`, '提示', {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        await this.$http.delete(`rest/technical_articles/${row._id}`)
        this.$message({
           type: "success",
          message: "删除成功!"
        })
        this.articlesFetch()
      })
    }
  }
};
</script>

<style scoped>

</style>