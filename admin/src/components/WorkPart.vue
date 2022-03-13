<template>
  <div class="work-part">
    <div class="work-create-area">
      <router-link :to="`/${worksPath}/create`">新增作品</router-link>
    </div>

    <div class="work-lists-area">
      <el-table :data="works"> 
        <el-table-column prop="_id" label="ID" width="240"></el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="mainTag.name" label="标签"></el-table-column>
        <el-table-column prop="url" label="缩略图">
          <template slot-scope="scope">
            <img :src="scope.row.url" alt="" style="height:3rem;">
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

}
</script>

<style>

</style>