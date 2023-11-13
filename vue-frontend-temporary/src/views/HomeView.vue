<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <PagesListUser/>
    <PostListUser/>
  </div>
</template>

<script>
// @ is an alias to /src
import PagesListUser from '@/components/PagesListUser.vue';
import PostListUser from '@/components/PostListUser.vue';

export default {
  name: 'HomeView',
  components: {
    PagesListUser,
    PostListUser
}
}
</script>
