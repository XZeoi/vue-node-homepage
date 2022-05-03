<template>
  <div class="dialog">
    <div class="article-edit-mask">
      <div class="article-edit-container">
        <div class="content">
          <h3 class="dialog-title">{{ id ? "编辑" : "新增" }}文章</h3>
          <el-form @submit.native.prevent="save" class="form-area">
            <el-row class="article-info">
              <el-col :span="6">
                <el-form-item label="标题">
                  <el-input
                    autofocus
                    v-model="model.title"
                    width="200px"
                    class="define-input title-input"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
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
              <el-col :span="6">
                <el-form-item label="标签">
                  <el-select v-model="model.subTags" multiple>
                    <el-option
                      v-for="item of subTags"
                      :key="item._id"
                      :label="item.name"
                      :value="item._id"
                    >

                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
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
            <el-form-item>
              <div>
                <el-switch
                  v-model="model.isBest"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                ></el-switch>
                <!-- BANNER -->
                <div v-show="model.isBest">
                  <el-upload
                    :headers="getAuthHeadersMixin()"
                    class="avatar-uploader"
                    :action="$http.defaults.baseURL + '/upload'"
                    :show-file-list="false"
                    :on-success="afterUpload"
                  >
                    <img :src="model.banner" v-if="model.banner" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                  <el-form-item label="描述">
                    <el-input v-model="model.description" type="textarea" maxlength="30" show-word-limit></el-input>
                  </el-form-item>
                </div>
              </div>
            </el-form-item>
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
              <el-button type="text" size="small" @click="close"
                >取消</el-button
              >
              <el-button type="text" size="small">保存为草稿</el-button>
              <el-button type="primary" size="small" native-type="submit"
                >发布</el-button
              >
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
    id: {
      type: String,
      default: "",
    },
    tagPath: {
      type: String,
      // required: true
    },
    subTagsPath: {
      type: String
    },
    articlePath: {
      type: String,
    },
  },
  data() {
    return {
      tags: [],
      subTags: [],
      model: {
        title: "",
        isBest: false,
        mainTag: "",
        subTag:[],
        infos: {
          timeCreated: "",
        },
        banner: "",
        description: "",
        isSecret: false,
        content: "",
      },
    };
  },
  created() {
    // 1. 获取tag及subTags
    this.tagFetch();
    this.subTagsFetch();
    // 2. 当id存在，拉取当前文章
    this.id && this.articleFetch();
  },
  methods: {
    /* tag获取 */
    async tagFetch() {
      // const res = await this.$http.get("rest/main_tags");
      const res = await this.$http.get(`rest/${this.tagPath}`);
      this.tags = res.data;
      console.log(this.tags);
    },
    /* subTags获取 */
    async subTagsFetch() {
      const res = await this.$http.get(`rest/${this.subTagsPath}`);
      this.subTags = res.data;
    },

    /* 关闭对话框 */
    close() {
      // this.$emit("dialogClose");
      this.$confirm(`是否退出编辑`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$router.back(-1);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /* 当id存在，为编辑文章时，拉取当前具体文章数据 */
    async articleFetch() {
      // const res = await this.$http.get(`rest/technical_articles/${this.id}`)
      const res = await this.$http.get(`rest/${this.articlePath}/${this.id}`);
      this.model = res.data;
      console.log(this.model);
    },
    /* 发布文章 */
    save() {
      // 1. 弹窗确认是否发布
      this.$confirm(`是否确认发布该文章`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          if (this.id) {
            // const res = await this.$http.put(`rest/technical_articles/${this.id}`, this.model)
            const res = await this.$http.put(
              `rest/${this.articlePath}/${this.id}`,
              this.model
            );
            this.$message({
              type: "success",
              message: "修改成功!",
            });
            this.$router.back(-1);
            // 后续需要在TechnicalArticle.vue组件中更新数据，我们在TechnicalArticle.vue采用watch监听路由变化
          } else {
            // const res = await this.$http.post('rest/technical_articles', this.model)
            const res = await this.$http.post(
              `rest/${this.articlePath}`,
              this.model
            );
            this.$message({
              type: "success",
              message: "发布成功!",
            });
            this.$router.back(-1);
            // 后续需要在TechnicalArticle.vue组件中更新数据，我们在TechnicalArticle.vue采用watch监听路由变化
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /* vue2editor多媒体文件上传 */
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)

      var formData = new FormData();
      formData.append("file", file);

      const res = await this.$http.post("upload", formData);
      console.log(res);
      const url = res.data.url; // Get url from response
      Editor.insertEmbed(cursorLocation, "image", url);
      resetUploader();
    },

    /* 精选文章的Banner上传成功 */
    afterUpload(res) {
      console.log(res);
      this.$set(this.model,"banner", res.url)
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
  flex-direction: column;
  height: 100%;
}

.form-area {
  display: flex;
  flex-direction: column;
  flex: 1;
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