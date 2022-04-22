<template>
  <div class="login-page">
    <el-card header="请先登录" class="login-card">
      <el-form @submit.native.prevent="login" label-width="60px">
        <el-form-item label="用户名">
          <el-input v-model="user.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="user.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async login() {
      const res = await this.$http.post("login", this.user)
      sessionStorage.token = res.data.token
      this.$router.push('/')
      this.$message({
        message: "登录成功！",
        type: "success"
      })
    }
  }
}
</script>

<style scoped>
.login-card{
  width: 25rem;
  margin: 5rem auto;
}

</style>