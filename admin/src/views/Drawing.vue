<template>
  <div class="drawing-page">
    <h2>绘画作品</h2>
    <work-part worksPath="drawings"></work-part>
  </div>
</template>

<script>
import WorkPart from "@/components/WorkPart.vue"

export default {
  components: { WorkPart }
}
</script>

<style>

</style>