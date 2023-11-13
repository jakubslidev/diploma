<template>
  <div>
    <h2>Posts</h2>
    <ul>
      <li v-for="post in posts" :key="post._id">
        <router-link :to="'/post/' + post._id">{{ post.title }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, watchEffect } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const posts = ref([]);
    const accessToken = localStorage.getItem('accessToken'); // Retrieve the token from local storage
    const route = useRoute();

    watchEffect(() => {
      const webpageId = route.params.webpageId;

      if (webpageId) {
        fetchData(webpageId);
      }
    });

    const fetchData = async (webpageId) => {
      try {
        const response = await axios.get(`http://localhost:3000/posts/webpage/${webpageId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        
        posts.value = response.data;
        console.log(posts);
      } catch (error) {
        console.error('Error fetching posts:', error.message);
      }
    };

    return {
      posts,
    };
  },
};
</script>
