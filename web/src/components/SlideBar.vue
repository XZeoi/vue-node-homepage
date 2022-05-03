<template>
  <div class="slide-bar">
    <div class="pagination-area d-flex jc-around">
      <div
        class="pagination-item d-flex jc-around ai-center border-right border-top"
        v-for="(item, i) in paginationInfo"
        :key="item._id"
        :class="{ active: active === i }"
        @click="$refs.mySwiper.swiper.slideTo(i+1)"
      >
          <div class="image-area">
            <img :src="item.banner" alt="" class="h-100">
          </div>
          <div class="text-area d-flex flex-column">
            <span class="fs-xl">{{ item.category }}</span>
            <span class="text-dark-3">{{item.title}}</span>
          </div>

      </div>
    </div>
    <swiper
      :options="swiperOption"
      ref="mySwiper"
      v-if="banners.length"
      class="swiper-area banner"
      @transitionStart="indexChange"
    >
      <!-- slides -->
      <!-- <swiper-slide> -->
      <swiper-slide class="swiper-slide-area" v-for="slide in banners" :key="slide._id">
        <img :src="slide.banner" alt="" />
      </swiper-slide>
      <!-- Optional controls -->
      <!-- <div class="swiper-pagination" slot="pagination"></div> -->
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
      <!-- <div class="swiper-scrollbar" slot="scrollbar"></div> -->
    </swiper>
  </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";

export default {
  components: {
    swiper,
    swiperSlide,
  },
  data() {
    return {
      // 默认高亮索引值
      active: 0,
      swiperOption: {
        loop: true,
        autoplay: {
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        pagination: {
          el: ".swiper-pagination",
        },
      },
      banners: [],
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
    paginationInfo() {
      return this.banners.map((val,i)=>{
        const categories = ["技术","随笔","摄影","设计","绘画"]
        val.category = categories[i]
        return val
      })
    }
  },
  mounted() {
    // current swiper instance
    // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    // console.log("this is current swiper instance object", this.swiper);
    // this.swiper.slideTo(3, 1000, false);
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("carousels");
      this.banners = res.data;
      // console.log(this.banners);
    },
    indexChange() {
      this.active = this.$refs.mySwiper.swiper.realIndex
      // console.log(this.$refs.mySwiper.swiper);
    }
  },
};
</script>

<style lang="scss">
@import "../assets/scss/variables";

.pagination-item {
  width: 100%;
  height: 90px;
  // height: 0;
  // padding-bottom:8%;

  &.pagination-item:nth-child(1) {
    border-left: 1px solid $border-color;
  }
  &.active {
    border-top: 3px solid map-get($colors, "primary");
    // color: map-get($colors, "primary");
  }
  .image-area {
    // width: 66px;
    height: 66px;
    overflow: hidden;
  }
}

.swiper-area {
  .swiper-slide-area {
    position: relative;

    img {
      position: absolute;
      transform: translate(0, -20%);
    }
  }
}


</style>