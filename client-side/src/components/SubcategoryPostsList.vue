<template>
    <div class="container text-center">
      <br><br><br>
      <div class="row align-items-start">
        <div class="col-lg-4" v-for="(post) in displayedPosts" :key="post._id">
          <div class="card">
            <div class="card-background">
              <img :src="post.thumbnailSmall" class="card-img">
            </div>
            <div class="content">
              <div class="card-category">{{ post.categoryName }}</div>
              <router-link :to="'/' + $route.params.webpageId + '/post/' + post._id">
                <h3 class="card-heading" :style="{ color: post.titleColor }">{{ post.title }}</h3>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

  <script>
  import { ref, onMounted, watch, computed } from 'vue';
  import axios from 'axios';
  import { useRoute } from 'vue-router';
  
  export default {
    setup() {
      const posts = ref([]);
      const route = useRoute();
    
      const fetchData = async () => {
        const categoryId = route.params.categoryId; // Extract the categoryId from the route params
        const subcategory = route.params.subcategory; // Extract the subcategory from the route params
        
        console.log(categoryId);
        console.log(subcategory);

        try {
          // Adjust the URL to match the new endpoint structure
          const response = await axios.get(`http://localhost:3000/posts/${route.params.webpageId}/${categoryId}/${subcategory}`);
          posts.value = response.data;
          console.log("RESPONSE" + response.data);
          console.log("POSTS" + posts.value);
        } catch (error) {
          console.error('Error fetching posts by subcategory:', error.message);
        }
      };
  
      // Fetch data when the component is mounted
      onMounted(fetchData);
  
      // Re-fetch data when route parameters change
      watch(() => [route.params.webpageId, route.params.categoryId, route.params.subcategory], fetchData, { immediate: true });
  
      const displayedPosts = computed(() => posts.value);
  
      return {
        displayedPosts,
      };
    },
  };
  </script>
  

  <style scoped>
  .row {
    margin-bottom: 50px;
  }
  
  .main-row{
    margin-top: 50px;
  }
  
  .card {
    border-radius: 20px;
    position: relative;
    list-style: none;
    gap: 30px;
    transition: .3s ease;
  }
  
  .card-background {
    border-radius: 20px;
    overflow: hidden;
    height: 65%;
    background-size: cover;
    background-position: center;
    filter: brightness(.9) saturate(1) contrast(1);
    transition: .3s ease;
  }
  
  .card:hover .card-background {
    transform: scale(1.15) translateZ(0);
    background-size: 260px;
  }
  
  .card-container:hover .card:not(:hover) {
    transform: scale(.9);
  }
  
  .card-container:hover > .card:not(:hover) .card-background,
  .card-container:hover > .card:not(:hover) .card-category {
    filter: brightness(.5) saturate(0) contrast(1.2) blur(20px);
  }
  
  .content {
    top: 50%;
    left: 0;
    padding: 25px;
    position: absolute;
  }
  
  .card-category {
    color: #fff;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 5px;
    margin-bottom: 8px;
    text-transform: uppercase;
  }
  
  .card-heading {
    color: #fff;
    font-size: 25px;
    line-height: 1;
    text-shadow: 2px 2px 20px rgba(0, 0, 0, .2);
  }
  
  /* New class for the first card in each row */
  .card-big {
    width: 600px; /* Adjusted width for the big card */
  }
  
  /* New class for the rest of the cards in each row */
  .card-small {
    width: 400px;
  }
  </style>