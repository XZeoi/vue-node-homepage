<template>
  <div class="dialog">
    <div class="article-edit-mask">
      <div class="article-edit-container">
        <div class="content">
          <h3 class="dialog-title">{{ id ? "编辑" : "新增" }}文章</h3>
          <el-form @submit.native.prevent="save" class="form-area">
            <el-row class="article-info">
              <el-col :span="8">
                <el-form-item label="标题">
                  <el-input
                  autofocus
                    v-model="model.title"
                    width="200px"
                    class="define-input title-input"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="类型">
                  <el-select v-model="model.mainTag" class="define-input">
                    <el-option
                      v-for="item of tags"
                      :key="item._id"
                      :label="item.name"
                      :value="item._id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="时间">
                  <el-date-picker
                  class="define-input"
                  default-value
                  v-model="model.infos.timeCreated"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item class="editor-area">
              <div>
                <vue-editor
              
                class="article-editor"
                v-model="model.content"
                useCustomImageHandler
                @image-added="handleImageAdded"
              ></vue-editor>
              </div>
            </el-form-item>
            <el-form-item class="submit-area">
              <el-button type="text" size="small">取消</el-button>
              <el-button type="text" size="small">保存为草稿</el-button>
              <el-button type="primary" size="small" native-type="submit">发布</el-button>
            </el-form-item>
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
import { VueEditor } from "vue2-editor";

export default {
  components: {
    VueEditor,
  },
  props: {
    isCreateStatus: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      tags: [],
      model: {
        title: "",
        mainTag: "",
        infos: {
          timeCreated: '',
        },
        content: ''
      },
    };
  },
  created() {
    // 获取tag
    this.tagFetch();
    // 当id存在，拉取当前文章
    this.id && this.articleFetch()
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
      // this.$emit("dialogClose");
      this.$router.back(-1);
    },
    // 当id存在，为编辑文章时，拉取当前具体文章数据
    async articleFetch() {
      const res = await this.$http.get(`rest/technical_articles/${this.id}`)
      this.model = res.data
      console.log(this.model);
    },
    // 发布文章
    save() {
      // 1. 弹窗确认是否发布
      this.$confirm(`是否确认发布该文章`,'提示', {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async ()=>{
        if (this.id) {
          const res = await this.$http.put(`rest/technical_articles/${this.id}`, this.model)
          this.$message({
            type: "success",
            message: "修改成功!"
          });
          this.$router.back(-1);
          this.$emit('articlesUpdate')
        } else {
          const res = await this.$http.post('rest/technical_articles', this.model)
          this.$message({
            type: "success",
            message: "发布成功!"
          });
          this.$router.back(-1);
          // 后续需要在TechnicalArticle.vue组件中更新数据
          this.$emit('articlesUpdate')
        }
        
      }).catch((err)=>{
        console.log(err);
      })
    },
    // vue2editor多媒体文件上传
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)

      var formData = new FormData();
      formData.append("file", file);

      const res = await this.$http.post('upload', formData)
      console.log(res)
      const url = res.data.url; // Get url from response
      Editor.insertEmbed(cursorLocation, "image", url);
      resetUploader()
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
  /* 这里如果设置一个更大的数字，
  比如99999，那么el-option的各选项就会被隐藏在当前容器下。 
  */
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: auto;
}

.article-edit-container {
  background-color: #fff;
  min-width: 700px;
  /* min-height: 500px; */
  width: 70vw;
  /* height: 90vh; */
  position: relative;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
  /* margin-bottom: 30px; */


}

.content {
  padding: 6px 16px;
  display: flex;
  flex-direction:column;
  height: 100%;
}

.form-area {
  display: flex;
  flex-direction:column;
  flex: 1;
}

.article-info {
 
}

.dialog-title {
  margin: 0;
  padding: 6px 0;
}

.define-input {
  width: 186px;
}

.editor-area {
  flex: 1;
}

.article-editor {
  height: 100%;
}


.submit-area {
  height: 40px;
  display: flex;
  justify-content: flex-end;
}

.area-close {
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 24px;
}
</style>