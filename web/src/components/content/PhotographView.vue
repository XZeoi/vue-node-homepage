<template>
  <div class="technical-article-view mt-2">
    <div class="article-list d-flex flex-wrap" v-if="contents">
      <div v-for="(item, i) in contents" :key="i" class="list-item d-flex mb-2">
        <div class="img-area d-flex ai-center jc-center">
          <img :src="item.subs[0].url" alt="" />
        </div>
        <div class="info-area text-dark-3 fs-xs">
          <span>{{item.title}}</span>
        </div>
      </div>
    </div>
    <div class="pagination-bar d-flex jc-center">
      <jun-pagination
        :currentPage="page.currentPage"
        :pageTotal="page.pageTotal"
        @updatePage="getLists"
      ></jun-pagination>
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
        pageSize: 10, // 每页条数
      },
    };
  },
  created() {
    this.getLists();
  },
  methods: {
    async getLists(i) {
      // const res = await this.$http.get(`technical_articles/${i || this.page.currentPage}/${this.page.pageSize}`)
      this.page.currentPage = i || this.page.currentPage;
      const res = await this.$http.get(
        `photographs_title_lists/${this.page.currentPage}/${this.page.pageSize}`
      );
      this.contents = res.data.data;
      this.page.nums = res.data.count;
      this.page.pageTotal = res.data.pages;
      console.log(res);
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/_variables.scss";

.technical-article-view {
  .article-list {
    .list-item {
      width: 20%;
      height: 100px;

      .img-area {
          width: 70%;
          overflow: hidden;
          img {
            height: auto;
            width: auto;
            max-height: 90%;
            max-width: 90%;
            box-shadow: 2px 2px 3px;
          }
      }
    }
  }
}
</style>