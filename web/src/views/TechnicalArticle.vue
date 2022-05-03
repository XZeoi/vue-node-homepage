<template>
  <div class="technical-article">
    <nav-bar>
      <div><span>技术</span></div>
      <div><span>随笔</span></div>
      <div><span>摄影</span></div>
      <div><span>设计</span></div>
      <div><span>绘画</span></div>
    </nav-bar>
    <div class="main">
      <div class="container">
        <div class="content-area d-flex pt-3" v-if="article">
          <div class="article-part flex-1 pb-5">
            <div class="article">
              <h2>{{ article.title }}</h2>
              <div class="my-2">
                <span v-if="article.infos">{{
                  article.infos.timeCreated
                }}</span>
              </div>
              <div>
                <span v-if="article.mainTag" class="tag main-tag">{{
                  article.mainTag.name
                }}</span>
                <span>|</span>
                <span
                  v-for="(tag, i) in article.subTags"
                  :key="i"
                  class="tag sub-tag"
                  >{{ tag.name }}</span
                >
              </div>
              <!-- <div class="ql-editor"> -->
              <!-- <mavon-editor 
              v-model="article.content"
              :toolbarsFlag="false"
              :subfield="false"
              defaultOpen="preview"
              :scrollStyle="false"
              :boxShadow="false"
              previewBackground="#fff"
            ></mavon-editor> -->
              <div class="pt-2 pb-3">
                <mavon-editor
                  v-html="md"
                  v-highlight
                  codeStyle="github-dark-dimmed"
                  style="box-shadow: none"
                ></mavon-editor>
              </div>
              <!-- <div class="pt-2 pb-3"> -->
              <!-- <mavon-editor
                v-html="md"
                v-highlight
                codeStyle="qtcreator-dark"
                style="box-shadow: none"
              ></mavon-editor> -->
              <!-- </div> -->
              <!-- <div class="article-content markdown-body" v-html="md"></div> -->
              <!-- <div class="article-content" v-html="md"></div> -->
              <!-- </div> -->
            </div>
            <div class="nav d-flex jc-between">
              <span
                v-if="pre"
                @click="$router.push(`/technical_article/${pre._id}`)"
                ><i></i>上一篇:{{ pre.title }}</span
              >
              <span
                v-if="next"
                @click="$router.push(`/technical_article/${next._id}`)"
                ><i></i>下一篇:{{ next.title }}</span
              >
            </div>
          </div>
          <div class="aside-part mx-5">
            <div class="title d-flex ai-center">
              <i class="icon mr-2"></i>
              <span> 其他文章 </span>
            </div>
            <div
              class="aside-item mt-2 ml-3"
              v-for="(item, i) in lists"
              :key="i"
              @click="$router.push(`/technical_article/${item._id}`)"
            >
              <span>{{ item.title }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <contact-area></contact-area>
      <footer-bar></footer-bar>
    </div>
  </div>
</template>

<script>
import ContactArea from "@/components/ContactArea.vue";
import FooterBar from "@/components/FooterBar.vue";
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";

import NavBar from "@/components/common/NavBar.vue";

export default {
  props: {
    id: { required: true },
  },
  components: {
    ContactArea,
    FooterBar,
    mavonEditor,
    NavBar,
  },
  data() {
    return {
      article: {
        content: "",
      },
      lists: [],
      pre: {},
      next: {},
    };
  },
  computed: {
    md() {
      const markdownIt = mavonEditor.getMarkdownIt();
      return markdownIt.render(this.article.content);
    },
  },
  watch: {
    // 由于共用同一组件，id改变，created钩子函数只在组件最初创建时触发。所以需要额外监听id的变化，来更新当前数据（文章）
    id: "getArticle",
  },
  created() {
    this.getArticle();
  },
  methods: {
    async getArticle() {
      const res = await this.$http.get(`technical_article/${this.id}`);
      this.article = res.data.article;
      this.lists = res.data.otherLists;
      this.pre = res.data.pre;
      this.next = res.data.next;
      console.log(res.data);
    },
  },
};
</script>

<style  lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.technical-article {
  .content-area {
    .article-part {
      .tag {
        color: #fff;
        // border: 1px solid #333;
        border-radius: 3px;
        padding: 2px 5px;
      }
      .main-tag {
        background: blue;
        margin-right: 3px;
      }
      .sub-tag {
        margin-left: 3px;
        background: #999;
      }
    }

    .aside-part {
      width: 20%;

      .title {
        font-size: 16px;

        .icon {
          display: inline-block;
          width: 5px;
          height: 16px;
          background: map-get($colors, "primary");
        }
      }
      .aside-item {
        cursor: pointer;
      }
    }
  }
  .footer {
    // position: absolute;
    // bottom: 0;
  }
}
</style>