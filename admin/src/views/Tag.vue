<template>
  <div class="tag-page">
    <h1>标签管理</h1>
    <div class="main-tag">
      <div class="main-tag-area">
        <span class="tag-item" v-for="(item,i) of mainTags" :key="i"></span>
        <span v-if="isWrite" class="tag-item" @click="mainTagCreate"><i class="el-icon-plus"></i>添加</span>
        <span v-else class="tag-item">
          <input v-model="newTag" class="tag-input" autofocus>
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
      mainTags: [],
      subTags: [],
      isWrite: 1,
      newTag: ""
    }
  },
  created() {},
  methods: {
    mainTagCreate() {
      // 1. 
      this.isWrite = 0
      // 2. 

    },
    async mainTagSave() {
       
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