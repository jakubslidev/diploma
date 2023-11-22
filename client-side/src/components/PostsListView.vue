<template>
  <div class="container text-center">
    <h2>Posts</h2>
    <!-- First Row -->
    <div class="row align-items-start">
      <div class="col-lg-6">
        <div class="post-box">
          <!-- Space for picture -->
          <p>Picture</p>
          <!-- Title inside the border -->
          <router-link v-if="posts.length > 0" :to="'/post/' + posts[0]._id">{{ posts[0].title }}</router-link>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="text-box">
          <p>Test</p>
          <p>TEST</p>
          <p>Test</p>
          <p>Test</p>
          <p>Test</p>
        </div>
      </div>
    </div>
    <!-- Subsequent Rows -->
    <div class="row align-items-start">
      <div class="col-lg-4" v-for="post in displayedPosts" :key="post._id">
        <div class="post-box">
          <!-- Space for picture (2/3 of height) -->
          <div class="post-image">
            <p>Picture</p>
          </div>
          <!-- Title with category (1/3 of height) -->
          <div class="post-title">
            <router-link :to="'/post/' + post._id">{{ post.title }}</router-link>
            <p>{{ post.categoryName }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watchEffect, computed } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const posts = ref([]);
    const route = useRoute();

    const fetchData = async (webpageId) => {
      try {
        const response = await axios.get(`http://localhost:3000/posts/view/webpage/${webpageId}`);
        posts.value = response.data;
      } catch (error) {
        console.error('Error fetching posts:', error.message);
      }
    };

    onMounted(() => {
      const webpageId = route.params.webpageId;
      if (webpageId) {
        fetchData(webpageId);
      }
    });

    watchEffect(() => {
      const webpageId = route.params.webpageId;
      if (webpageId) {
        fetchData(webpageId);
      }
    });

    const displayedPosts = computed(() => posts.value.slice(1, 7));

    return {
      posts,
      displayedPosts,
    };
  },
};
</script>

<style scoped>
.post-box {
  border: 2px solid;
  border-color: #D0D0D0;
  border-radius: 25px;
  height: 30em;
  margin-bottom: 25px; /* Add margin between each post-box */
}

.post-image {
  height: 66.67%; /* 2/3 of the post-box height */
  border-bottom: 2px solid #D0D0D0; /* Add a border between image and title */
}

.post-title {
  height: 33.33%; /* 1/3 of the post-box height */
  padding: 0.5em; /* Adjust padding as needed */
}

/* Add additional styling as needed */
</style>
