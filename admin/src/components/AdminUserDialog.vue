<template>
  <div class="admin-user-dialog">
    <div class="article-edit-mask">
      <div class="article-edit-container">
        <div class="content">
          <h2>{{ id ? "编辑" : "新增" }}账号</h2>
          <div class="form-area">
            <el-form @submit.native.prevent="save" label-width="60px">
              <el-form-item label="管理员">
                <el-input v-model="user.username" autofocus style="width:300px"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input v-model="user.password" show-password style="width:300px"></el-input>
              </el-form-item>
              <el-form-item class="submit-area">
                <el-button type="text" size="small" @click="close"
                  >取消</el-button
                >
                <el-button type="primary" size="small" native-type="submit"
                  >保存</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="area-close">
          <i class="el-icon-close"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: { id: { type: String } },
  data() {
    return {
      user: {
        username: '',
        password: ''
      },
    };
  },
  created() {
    this.id && this.fetch;
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`admin_users/${this.id}`);
      this.user = res.data;
    },
    close() {
      this.$confirm(`是否退出编辑`,'提示', {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          this.$router.back(-1);
      }).catch((err)=>{
        console.log(err);
      })
    },
    save() {
      this.$confirm(`是否确认保存该账号`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          if (this.id) {
            const res = await this.$http.put(
              `rest/admin_users/${this.id}`,
              this.user
            );
            this.$message({
              type: "success",
              message: "修改成功!",
            });
            this.$router.back(-1);
            // 后续需要在TechnicalArticle.vue组件中更新数据，我们在TechnicalArticle.vue采用watch监听路由变化
          } else {
            const res = await this.$http.post("rest/admin_users", this.user);
            this.$message({
              type: "success",
              message: "保存成功!",
            });
            this.$router.back(-1);
            // 后续需要在TechnicalArticle.vue组件中更新数据，我们在TechnicalArticle.vue采用watch监听路由变化
          }
        })
        .catch((err) => {
          console.log(err);
        });
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
  /* 这里如果设置一个更大的数字，
  比如99999，那么el-option的各选项就会被隐藏在当前容器下。 
  */
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: auto;
}

.article-edit-container {
  background-color: #fff;
  /* min-width: 400px; */
  /* min-height: 500px; */
  width: 400px;
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