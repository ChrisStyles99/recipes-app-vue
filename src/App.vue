<template>
  <div id="app">
    <Navbar/>
    <Errors v-if="error" :msg="error" />
    <router-view/>
    <FooterComp />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar';
import FooterComp from '@/components/FooterComp';
import Errors from '@/components/Errors';
import {mapGetters} from 'vuex';

export default {
  components: {
    Navbar,
    FooterComp,
    Errors
  },
  computed: {
    ...mapGetters(['error'])
  },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Quicksand&display=swap');

html {
  scroll-behavior: smooth;
}

body {
  background-color: $bg-color;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Quicksand', sans-serif;
}
</style>
