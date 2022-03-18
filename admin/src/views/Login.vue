<template>
  <div class="login-page">
    <el-card>
      <el-form @submit.native.prevent="submit" label-width="60px">
        <el-form-item label="用户名">
          <el-input v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="user.password" show-password></el-input>
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
    async submit() {
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

<style>

</style>