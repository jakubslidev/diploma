<template>
    <div class="container text-center">
      <!-- Subsequent Rows -->
      <br>
      <br>
      <br>
      <div v-if="loading">
        <p>LOADING</p>
      </div>
      <div v-else>
        <div class="row align-items-start">
        <div class="col-lg-4" v-for="(post) in displayedPosts" :key="post._id">
          <div class="card card-small">
            <div class="card-background">
              <img :src="post.thumbnailSmall" style="height: 66.67%; object-fit: cover;">
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
      const categoryId = ref('');
      const loading = ref(true);
      const webpageStatus = ref('');
      
    const checkWebpageStatus = async () => {
      
      try {
        const response = await axios.get(`http://localhost:3000/webpages/${route.params.webpageId}/status`);
        webpageStatus.value = response.data.status;

        if (webpageStatus.value === 'inactive') {
          window.location.href = (`/maintenanceMessage`);
        }
        loading.value = false;
      } catch (error) {
        console.error('Error fetching webpage status:', error);
      }
    };



      const fetchData = async (webpageId, categoryId) => {
  try {
    const response = await axios.get(`http://localhost:3000/posts/view/webpage/${webpageId}/withoutauth`);

    posts.value = response.data.filter(post => {
      const postCategoryId = post.category;

      const isMatchingCategory = postCategoryId === categoryId._value;

      return isMatchingCategory;
    });

  } catch (error) {
    console.error('Error fetching posts:', error.message);
  }
};


  
      onMounted(() => {
        checkWebpageStatus();
        const webpageId = route.params.webpageId;
        const lastParam = route.params.categoryId.split('/').pop();
        categoryId.value = lastParam;
  
        if (webpageId && categoryId) {
          fetchData(webpageId, categoryId);
        }
      });
  
      watchEffect(() => {
        const webpageId = route.params.webpageId;
        const lastParam = route.params.categoryId.split('/').pop();
        categoryId.value = lastParam;
  
        if (webpageId && categoryId) {
          fetchData(webpageId, categoryId);
        }
      });
  
      const displayedPosts = computed(() => posts.value);
  
      return {
        posts,
        displayedPosts,
        categoryId,
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