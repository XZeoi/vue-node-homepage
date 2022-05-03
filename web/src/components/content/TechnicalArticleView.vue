<template>
  <div class="technical-article-view mt-2">
    <div class="article-list" v-if="contents">
      <div v-for="(item, i) in contents" :key="i" class="d-flex mb-2" @click="$router.push(`/technical_article/${item._id}`)">
        <span class="tag mr-2">{{ item.mainTag.name }}</span>
        <span class="flex-1">{{ item.title }}</span>
        <span>{{ item.infos.timeCreated }}</span>
      </div>
    </div>
    <div class="pagination-bar d-flex jc-center">
      <jun-pagination :currentPage="page.currentPage" :pageTotal="page.pageTotal" @updatePage="getLists"></jun-pagination>
    </div>
  </div>
</template>

<script>
import JunPagination from "@/components/common/JunPagination.vue";

export default {
  components: {
    JunPagination,
  },
  data() {
    return {
      contents: [],
      page: {
        nums: 1, // 总条数
        pageTotal: 1, // 总页数
        currentPage: 1, // 当前页
        pageSize: 10 // 每页条数
      }
    };
  },
  created() {
    this.getLists()
  },
  methods: {
    async getLists(i) {
      // const res = await this.$http.get(`technical_articles/${i || this.page.currentPage}/${this.page.pageSize}`)
      this.page.currentPage = i || this.page.currentPage
      const res = await this.$http.get(`technical_articles_title_lists/${this.page.currentPage}/${this.page.pageSize}`)
      this.contents = res.data.data
      this.page.nums = res.data.count
      this.page.pageTotal = res.data.pages
      console.log(res);
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/_variables.scss";

.technical-article-view {
  .article-list {
    columns: 2;
    column-gap: 50px;

    .tag {
      display: inline-block;
      padding: 1px 3px;
      background: map-get($map: $colors, $key: "primary");
      border-radius: 2px;
      color: #fff;
    }
  }
}
</style>