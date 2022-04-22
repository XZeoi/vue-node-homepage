<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <top-bar></top-bar>
    <slide-bar></slide-bar>
    <content-area></content-area>
    <content-area></content-area>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
import TopBar from '@/components/TopBar.vue'
import SlideBar from '@/components/SlideBar.vue'
import ContentArea from '@/components/ContentArea.vue'
import ContactArea from '@/components/ContactArea.vue'
import FooterBar from '@/components/FooterBar.vue'

export default {
  name: 'Home',
  components: {
    TopBar, SlideBar, ContentArea, ContentArea, FooterBar
  }
}
</script>
