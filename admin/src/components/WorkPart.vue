<template>
  <div class="work-part">
    <div class="work-create-area">
      <router-link :to="`/${worksPath}/create`">新增作品</router-link>
    </div>

    <div class="work-lists-area">
      <el-table :data="works">
        <el-table-column
          prop="title"
          label="标题"
          width="200px"
        ></el-table-column>
        <el-table-column
          prop="mainTag.name"
          label="标签"
          width="60px"
        ></el-table-column>
        <el-table-column
          prop="infos.timeCreated"
          label="日期"
          width="100px"
        ></el-table-column>
        <el-table-column label="缩略图">
          <template slot-scope="scope">
            <!-- {{scope.row.subs[1]}} -->
            <!-- <img :src="scope.row.subs[0].url" alt="" style="height:3rem;"> -->
            <img
              :src="item.url"
              alt=""
              style="height: 3rem; margin-left:3px"
              v-for="(item, index) in scope.row.subs"
              :key="index"
              @click="imgClick(item)"
            />
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="scope">
            <!-- <el-button
            type="text"
            size="small"
            @click="$router.push(`/technical_articles/edit/${scope.row._id}`)"
          >编辑</el-button> -->
            <el-button
              type="text"
              size="small"
              @click="$router.push(`/${worksPath}/edit/${scope.row._id}`)"
              >编辑</el-button
            >
            <el-button type="text" size="small" @click="remove(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <el-dialog :visible.sync="dialogVisible">
        <img :src="imgUrl" alt="" style="width:100%">
      </el-dialog>
    </div>

    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    worksPath: { type: String },
  },
  data() {
    return {
      works: [],
      dialogVisible: false,
      imgUrl: ''
    };
  },
  watch: {
    // 监听路由变化，当ArticleDialog.vue组件保存文章后，跳转回当前路由时，需要更新文章列表
    $route(to, from) {
      this.worksFetch();
    },
  },
  created() {
    // 拉取文章列表
    this.worksFetch();
  },
  methods: {
    async worksFetch() {
      // const res = await this.$http.get('rest/technical_articles')
      const res = await this.$http.get(`rest/${this.worksPath}`);
      this.works = res.data;
      console.log("列表数据", res);
    },
    // 删除目标文章
    remove(row) {
      this.$confirm(`是否确定要删除文章 "${row.title}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        // await this.$http.delete(`rest/technical_articles/${row._id}`)
        await this.$http.delete(`rest/${this.worksPath}/${row._id}`);
        this.$message({
          type: "success",
          message: "删除成功!",
        });
        this.worksFetch();
      });
    },
    // 放大照片
    imgClick(row) {
      this.dialogVisible = true
      this.imgUrl = row.url
    }
  },
};
</script>

<style>

</style>