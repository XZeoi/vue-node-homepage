<template>
  <div class="dialog">
    <div class="article-edit-mask">
      <div class="article-edit-container">
        <div class="content">
          <h3>{{ id ? "编辑" : "新增" }}文章</h3>
          <el-form label-width="60px">
            <el-form-item label="标题">
              <el-input
                v-model="model.title"
                width="200px"
                class="title-input"
              ></el-input>
            </el-form-item>
            <el-form-item label="分类">
              <el-select v-model="model.mainTag">
                <el-option
                  v-for="tag of tags"
                  :key="tag._id"
                  :label="tag.name"
                  :value="tag._id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item> </el-form-item>
          </el-form>
        </div>
        <div class="area-close" @click="close">
          <i class="el-icon-close"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isCreateStatus: {
      type: Boolean,
      default: false,
    },
    id: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      tags: [],
      model: {}
    };
  },
  created() {
    // 获取tag
    this.tagFetch();
  },
  methods: {
    // tag获取
    async tagFetch() {
      const res = await this.$http.get("rest/main_tags");
      this.tags = res.data;
      console.log(this.tags);
    },
    // 关闭对话框
    close() {
      this.$emit('dialogClose')
    }
  },
};
</script>

<style scoped>
.article-edit-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  /* border: 1px solid #000; */
  z-index: 99999;
  background-color: rgba(0, 0, 0, 0.5);
}

.article-edit-container {
  background-color: #fff;
  width: 50vw;
  height: 80vh;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
}

.content {
  padding: 20px;
}

.title-input {
  width: 200px;
}

.area-close {
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 24px;
}
</style>