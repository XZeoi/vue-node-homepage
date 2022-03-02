<template>
  <div class="tag-page">
    <h1>标签管理</h1>
    <div class="main-tag">
      <div class="main-tag-area">
        <span class="tag-item" v-for="(item,i) of mainTags" :key="i">{{item.name}}</span>
        <span v-if="isWrite" class="tag-item" @click="mainTagCreate"><i class="el-icon-plus"></i>添加</span>
        <span v-else class="tag-item">
          <input v-model="newMainTag.name" class="tag-input" autofocus>
          <el-button type="text" size="small" @click="isWrite = 1">取消</el-button>
          <el-button type="text" size="small" @click="mainTagSave">确认</el-button>
        </span>
      </div>
    </div>
    <div class="sub-tag">

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newMainTag: {},
      mainTags: [],
      newSubTag: {},
      subTags: [],
      isWrite: 1,
      
    }
  },
  created() {
    /* 执行 */
    this.fetchMainTags()
  },
  methods: {
    /* 获取后台数据库中mainTags */
    async fetchMainTags() {
      console.log('res')

      const res = await this.$http.get('main_tags')
      console.log('res',res)

      this.mainTags = res.data
    },
    mainTagCreate() {
      // 1. 
      this.isWrite = 0
      // 2. 

    },
    async mainTagSave() {
      await this.$http.post("main_tags", this.newMainTag)
      console.log('2',this.newMainTag)
      // 清空input输入框内容
      this.newMainTag = {}
      // 输入框自动对焦
      // 关闭输入框
      this.isWrite = 1
      // 更新mainTags
      this.fetchMainTags()
    }
  }
}
</script>

<style scoped>
.tag-item {
  border: 1px dashed #999;
  border-radius: 2px;
  padding: 3px;
}

.tag-input {
  outline: none;
  border: none
}

</style>