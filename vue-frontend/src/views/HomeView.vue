<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <PagesListUser/>
  </div>
</template>

<script>
// @ is an alias to /src
import PagesListUser from '@/components/PagesListUser.vue';

export default {
  name: 'HomeView',
  components: {
    PagesListUser
}
}
</script>
