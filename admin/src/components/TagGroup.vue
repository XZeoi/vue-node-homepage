<template>
  <div class="tag-group">
    <div class="main-tag-area">
      <tag-item
        v-for="(item, index) of tags"
        :key="index"
        :tag="item"
        :path="path"
      ></tag-item>

      <tag-item plus :path="path"></tag-item>
    </div>
  </div>
</template>

<script>
import TagItem from "./TagItem.vue";

export default {
  props: {
    tags: { type: Array },
    path: { type: String }
  },
  components: {
    TagItem,
  }
};
</script>

<style scoped>
.main-tag-area {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
}
</style>