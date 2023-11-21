<template>
    <div v-if="post">
      <h2>{{ post.title }}</h2>
      <p>{{ post.content }}</p>
      <p><strong>{{  post.categoryName }}</strong></p>
    </div>
    <div v-else>
      Loading...
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useRoute } from 'vue-router';
  
  export default {
    setup() {
      const route = useRoute(); // Get the current route object
      const post = ref(null);
  
      onMounted(async () => {
        const postId = route.params.id; // Access the id parameter from the route
        const response = await axios.get(`http://localhost:3000/posts/${postId}`);
        post.value = response.data;
      });
  
      return {
        post,
      };
    },
  };
  </script>
  