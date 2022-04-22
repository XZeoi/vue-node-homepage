<template>
  <div class="setting">
    <h2>系统设置</h2>
    <el-form @submit.native.prevent="save">
      <el-row>
        <el-col :span="8">
          <el-form-item label="LOGO">
            <el-upload
              :headers="getAuthHeadersMixin()"
              class="avatar-uploader"
              :action="$http.defaults.baseURL + '/upload'"
              :show-file-list="false"
              :on-success="afterUpload"
            >
              <img :src="settings.logo" v-if="settings.logo" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="日常语">
        <el-input v-model="settings.dailyWords"></el-input>
      </el-form-item>
      <el-form-item class="submit-area">
        <el-button type="text" size="small" @click="reset">重置</el-button>
        <el-button type="primary" size="small" native-type="submit"
          >更新</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      settings: {
        logo: "",
        dailyWords: "",
      },
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("rest/settings");
      console.log("list", res.data);
      if (res.data[0]) {
        this.settings = res.data[0];
      }
    },
    reset() {
      this.fetch();
    },
    save() {
      // 弹窗确认是否更新
      console.log("更新");
      this.$confirm(`是否更新设置`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          if (!this.settings._id) {
            const res = await this.$http.post("rest/settings", this.settings)
          } else {
            const res = await this.$http.put(`rest/settings/${this.settings._id}`, this.settings);
          }
          this.$message({
            type: "success",
            message: "更新成功!",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    afterUpload(res) {
      console.log("img", res);
      this.$set(this.settings, "logo", res.url);
      console.log(this.settings);
    },
  },
};
</script>

<style scoped>

.avatar-uploader .avatar {
  width: 300px;
  height: 143px;
}


.submit-area {
  height: 40px;
  display: flex;
  justify-content: flex-end;
}
</style>