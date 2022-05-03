<template>
  <div class="content-area mt-3">
    <div class="container">
      <div class="content-area-nav">
        <router-link class="mr-5 fs-xl" to="/content/technical_articles">技术文章</router-link>
        <router-link class="mr-5 fs-xl" to="/content/my_articles">随笔</router-link>
        <router-link class="mr-5 fs-xl" to="/content/photographs">摄影</router-link>
        <router-link class="mr-5 fs-xl" to="/content/designs">设计</router-link>
        <router-link class="mr-5 fs-xl" to="/content/drawings">绘画</router-link>
      </div>
      <div class="content-area-view">
        <div class="content-view">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      active: 0
    }
  }
};
</script>

<style scoped lang="scss">
@import "../assets/scss/variables";

.content-area {
  .content-area-nav {
    .isActive {
      color: map-get($colors, "strength");
    }
  }
}

</style>