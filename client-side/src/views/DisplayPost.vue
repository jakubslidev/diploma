<template>
  <viewNavbar></viewNavbar>
    <div class="home">
      <ViewPost/>
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import ViewPost from '@/components/ViewPost.vue'
import viewNavbar from '@/components/viewNavbar.vue';
  
  export default {
    name: 'DisplayPost',
    components: {
    ViewPost,
    viewNavbar
}
  }
  </script>
  