<template>
  <div class="my-article">
    <h2>我的文章</h2>
    <article-part articlesPath="my_articles"></article-part>
  </div>
</template>

<script>
import ArticlePart from "@/components/ArticlePart.vue"

export default {
  components: {
    ArticlePart
  }
}
</script>

<style scoped>

</style>