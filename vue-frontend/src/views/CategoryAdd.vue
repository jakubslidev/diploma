<template>
    <div class="home">
      <img alt="Vue logo" src="../assets/logo.png">
      <CategoryAdd/>
    </div>
</template>

  <script>
  // @ is an alias to /src
  import CategoryAdd from '@/components/CategoryAdd.vue'
  
  export default {
    name: 'HomeView',
    components: {
        CategoryAdd
    }
  }
  </script>
  