<template>
    <mainNavbar/>
    <div class="about">
      <h1>This is an about page</h1>
    </div>
    <EditPost/>
  </template>
  
  <script>
  import mainNavbar from '@/components/mainNavbar.vue';
  import EditPost from '@/components/EditPost.vue';
  
  export default {
    components: {
      mainNavbar,
      EditPost
    },
  };
  </script>
  