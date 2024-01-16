<template>
    <div class="post-manager container mt-4">
      <h2 class="mb-4">Post Manager</h2>
      <div class="row">
        <div class="col-md-6">
          <h3>Posts</h3>
          <ul class="list-group">
            <li v-for="post in allPosts" :key="post._id" class="list-group-item d-flex justify-content-between align-items-center">
              <span>{{ post.title }}</span>
              <span v-if="post._id === mainPostId" class="badge bg-primary rounded-pill">(Main Post)</span>
              <div>
                <button @click="setMainPost(post._id)" class="btn btn-primary btn-sm me-2">Set as Main Post</button>
                <button
                  v-if="!isTrending(post._id)"
                  @click="addTrendingPost(post._id)"
                  class="btn btn-success btn-sm"
                >
                  Add to Trending
                </button>
                <button
                  v-else
                  @click="removeTrendingPost(post._id)"
                  class="btn btn-danger btn-sm"
                >
                  Remove from Trending
                </button>
              </div>
            </li>
          </ul>
        </div>
        <div class="col-md-6">
          <h3>Main Post</h3>
          <div class="card">
            <div class="card-body">
              <p v-if="mainPostId">{{ mainPostId.title }}</p>
              <p v-else>No main post set</p>
            </div>
          </div>
          <h3 class="mt-4">Trending Posts</h3>
          <ul class="list-group">
            <li
              v-for="post in trendingPosts"
              :key="post._id"
              class="list-group-item d-flex justify-content-between align-items-center"
            >
              <span>{{ post.title }}</span>
              <button @click="removeTrendingPost(post._id)" class="btn btn-danger btn-sm">Remove</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useRoute } from 'vue-router';
  import { useCookies } from 'vue3-cookies';
  
  export default {
    setup() {
      const allPosts = ref([]);
      const trendingPosts = ref([]); 
      const mainPostId = ref({});
      const route = useRoute();
      const { cookies } = useCookies(['access_token']);
      const accessToken = cookies.get('access_token');
  
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/posts/view/webpage/${route.params.webpageId}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          allPosts.value = response.data;
          
          const trendingResponse = await axios.get(`http://localhost:3000/webpages/${route.params.webpageId}/posts`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          trendingPosts.value = trendingResponse.data.trendingPosts;
          console.log(trendingResponse.data);
          mainPostId.value = trendingResponse.data.mainPost;
        } catch (error) {
          console.error('Error fetching posts:', error.message);
        }
      };
  
      const isTrending = (postId) => {
        return trendingPosts.value.some(post => post._id === postId);
      };
  
      const setMainPost = async (postId) => {
        try {
          await axios.post(`http://localhost:3000/webpages/${route.params.webpageId}/main-post`, { postId }, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          await fetchData();
        } catch (error) {
          console.error('Error setting main post:', error.message);
        }
      };
  
      const addTrendingPost = async (postId) => {
        try {
          await axios.post(`http://localhost:3000/webpages/${route.params.webpageId}/trending-posts`, { postId }, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          await fetchData();
        } catch (error) {
          console.error('Error adding to trending:', error.message);
        }
      };
  
      const removeTrendingPost = async (postId) => {
        try {
          await axios.delete(`http://localhost:3000/webpages/${route.params.webpageId}/remove-trending-post/${postId}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          await fetchData();
        } catch (error) {
          console.error('Error removing from trending:', error.message);
        }
      };
  
      onMounted(() => {
        fetchData();
      });
  
      return {
        allPosts,
        trendingPosts,
        mainPostId,
        isTrending,
        setMainPost,
        addTrendingPost,
        removeTrendingPost
      };
    },
  };
  </script>
  
  <style scoped>
  /* Add any custom CSS styles here */
  </style>
  