<template>
  <div class="work-dialog">
    <div class="article-edit-mask">
      <div class="article-edit-container">
        <div class="content">
          <h3 class="dialog-title">{{ id ? "编辑" : "新增" }}作品</h3>
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
            <!-- BANNER AREA -->
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
                    :on-success="bannerAfterUpload"
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

            <!-- <div class="upload-label">上传作品</div> -->
            <el-form-item class="editor-area">
              <!-- <div v-if="!id">
                <el-upload
                :action="$http.defaults.baseURL + '/upload'"
                list-type="picture-card"
                :on-remove="handleRemove"
                :on-success="afterUpload"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              </div> -->

              <div>
                <div>
                  <el-button class="" type="text" @click="model.subs.push({})"
                    ><i class="el-icon-plus"></i>新增</el-button
                  >
                </div>
                <div class="upload-area">
                  <div v-for="(item, index) of model.subs" :key="index">
                    <el-upload
                      :headers="getAuthHeadersMixin()"
                      class="avatar-uploader"
                      :action="$http.defaults.baseURL + '/upload'"
                      :show-file-list="false"
                      :on-success="(res) => afterUpload(res, index)"
                      :on-remove="(file) => handleRemove(file,index)"
                    >
                      <img :src="item.url" v-if="item.url" class="avatar" />
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </div>
                </div>
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
export default {
  props: {
    id: {
      type: String,
      default: "",
    },
    tagPath: {
      type: String,
    },
    articlePath: {
      type: String,
    },
  },
  data() {
    return {
      urls: [],
      tags: [],
      model: {
        title: "",
        mainTag: null,
        infos: {
          timeCreated: "",
        },
        isBest: false,
        banner: "",
        description: "",
        subs: [],
      },
      dialogVisible: false,
    };
  },
  created() {
    // 1. 获取tag
    this.tagFetch();
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
      // console.log(this.model);
    },
    /* 发布文章 */
    save() {
      // 1. 弹窗确认是否发布
      this.$confirm(`是否确认发布该作品`, "提示", {
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
    bannerAfterUpload(res) {
      this.$set(this.model,"banner", res.url)
    },
    afterUpload(res, i) {
      /* 替换当前位置的图片 */
      // 点击“新增”，始终会增加一个空的对象{}，所以“新增”即替换该空对象{}
      this.model.subs.splice(i, 1, { url: res.url });

      // console.log('i',i);
      // if (!this.model.subs.slice(-1)) {
      //   /* 方法一 */
      //   // 1. 删除subs最后一项
      //   this.model.subs.splice(-1, 1)
      //   // 2. 再添加进
      //   this.model.subs.push({url: res.url})
      // } else {
      // this.model.subs.splice(i, 1, {url: res.url})
      // }
      // this.$set(this.model, "subs", this.urls);
      // console.log("hey", this.model);
    },
    handleRemove(file, index) {
      console.log('remove',file, index);
    },
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
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: auto;
}

.article-edit-container {
  background-color: #fff;
  min-width: 700px;
  width: 70vw;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
}

.content {
  padding: 6px 16px;
  /* display: flex;
  flex-direction: column; */
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

.upload-label {
  font-size: 14px;
  color: #606266;
  margin-bottom: 6px;
}

.upload-area {
  display: flex;
  flex-wrap: wrap;
}

/* .img-dialog {
  z-index: 0;
} */

/* 这里原先的border: 1px dashed #d9d9d9;
没起作用原因是因为scoped限制了.el-upload（属于elementui内部样式）样式起作用的范围， 
解决办法一：换掉，自定义class就可以了，把.el-upload换掉自定义的class，这里可以删除掉.el-upload
解决办法二：使用CSS穿刺
*/
/* .avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
} */
</style>