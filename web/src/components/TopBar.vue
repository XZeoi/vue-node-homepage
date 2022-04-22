<template>
  <div class="top-bar">
    <div class="container d-flex ">
      <div class="logo-part">
        <div class="logo">
          <img :src="model.logo" alt="" style="width:48%" class="my-2">
        </div>
        <div class="free"></div>
      </div>
      <div class="nav-part d-flex ai-center fs-xl flex-1 ml-6">
        <a href="" class="mr-6">首 页</a>
        <a href="#content" class="mr-6">内 容</a>
        <a href="#contact" class="mr-6">联 系</a>
      </div>


      <!-- <div class="search-part d-flex ai-center">
        <input type="text">
        <i></i>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {}
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("settings")
      this.model = res.data[0]


      console.log(res.data);
    }
  }
};
</script>

<style>
</style>