<template>
  <div class="photograph-page">
    <h2>摄影作品</h2>
    <work-part worksPath="photographs"></work-part>
  </div>
</template>

<script>
import WorkPart from "@/components/WorkPart.vue";

export default {
  components: { WorkPart },
  data() {
    return {
      dialogVisible: false,
      dialogImageUrl: ''
    }
  },
  methods: {
    handleRemove(file, fileList) {
        console.log(file, fileList);
      },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
};
</script>

<style>
</style>