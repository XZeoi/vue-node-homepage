<template>
  <div class="jun-pagination">
    <ul class="pagination">
      <li class="disabled fs-xl" @click="preClick">
        <a href="javascript:;">
          <span>&laquo;</span>
        </a>
      </li>
      <li
        v-for="index in pages"
        :key="index"
        @click="liClick(index)"
        :class="currentPage == index ? 'active':''"
      >
              <!-- :class="{ active: currentPage == index }" -->
        <a href="javascript:;">
          <span>{{ index }}</span>
        </a>
      </li>

      <li class="disabled fs-xl" @click="nextClick">
        <a href="javascript:;">
          <span>&raquo;</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
    },
    pageTotal: {
      type: Number,
    },
  },
  data() {
    return {
      activePage: 1
    };
  },
  computed: {
    pages() {
      let { currentPage, pageTotal } = this.$props;
      if (pageTotal <= 5) {
        return pageTotal;
      }
      if (currentPage <= 2) {
        return [1, 2, 3, "...", pageTotal];
      } else if (currentPage >= pageTotal - 2) {
        return [1, "...", pageTotal - 2, pageTotal - 1, pageTotal];
      } else {
        return [
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          pageTotal,
        ];
      }
    },
  },
  methods: {
    liClick(i) {
      this.$emit("updatePage", i);
    },
    preClick() {
      let {currentPage} = this.$props

      if (currentPage > 1) {
        this.$emit("updatePage", --currentPage);
      console.log('hey');

      }
    },
    nextClick() {
      let {currentPage,pageTotal} = this.$props
      if (currentPage < pageTotal) {
        this.$emit("updatePage", ++currentPage);
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/_variables.scss";

.jun-pagination {
  .pagination {
    .disabled {
    }

    .active {
      color: map-get($map: $colors, $key: "strength");
      background: map-get($map: $colors, $key: "primary");
    }

    li {
      border: 1px solid map-get($colors, "strength");
      padding: 0 5px;
    }

    li:first-child {
      border: inherit;
    }

    li:last-child {
      border: inherit;
    }

    li:hover {
      background: map-get($map: $colors, $key: "primary");
    }

    li:first-child:hover {
      background: inherit;
    }
    li:last-child:hover {
      background: inherit;
    }
  }
}
</style>