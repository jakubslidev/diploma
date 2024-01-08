<template>
    <mainNavbar/>
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
  