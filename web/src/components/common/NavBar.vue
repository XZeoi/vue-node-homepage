<template>
  <div class="nav-bar">
    <div class="container d-flex">
      <div class="logo" @click="$router.push('/')">
        <img :src="logoUrl" alt="">
      </div>
      <div class="menu d-flex jc-around flex-1 ai-center">
        <slot></slot>
      </div>
      <div class="search">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    logoUrl: {
      type: String,
      default: ""
    }
  }
}
</script>

<style scoped lang="scss">
.nav-bar {
  min-height: 60px;
  .container {
    min-height: inherit; 

    .menu {
      width: 70%;
      min-height: inherit; 
    }
  }
}
</style>