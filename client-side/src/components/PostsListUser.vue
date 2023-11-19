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
import { ref, onMounted, watchEffect } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const posts = ref([]);
    console.log("TEST");
    const accessToken = localStorage.getItem('accessToken');
    const route = useRoute();

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

    onMounted(() => {
  const webpageId = route.params.webpageId;
  console.log('webpageId onMounted:', webpageId);

  if (webpageId) {
    fetchData(webpageId);
  }
  });


    watchEffect(() => {
  const webpageId = route.params.webpageId;
  console.log('webpageId watchEffect:', webpageId);

  if (webpageId) {
    fetchData(webpageId);
  }
});

    return {
      posts,
    };
  },
};

</script>
