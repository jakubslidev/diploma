<template>
  <MainNavbar></MainNavbar>
    <div class="home">
      <img alt="Vue logo" src="../assets/logo.png">
      <ViewPost/>
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import ViewPost from '@/components/ViewPost.vue'
import MainNavbar from '@/components/mainNavbar.vue';
  
  export default {
    name: 'DisplayPost',
    components: {
    ViewPost,
    MainNavbar
}
  }
  </script>
  