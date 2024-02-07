<template>
      <viewNavbar/>
    <div class="container text-center">
      <!-- Search Bar -->
      <br>
      <br>
      <br>
      <br>
      <br>
      <div class="search-container">
        <input type="text" v-model="searchQuery" placeholder="Search posts..." @keyup.enter="performSearch">
        <button @click="performSearch">Search</button>
      </div>
      <br>
      <br>
      <br>
      <br>
      <div v-if="isLoading" class="loading">Loading...</div>
      <!-- Posts in Rows -->
      <div class="row align-items-start">
        <div class="col-lg-4 col-md-6 col-sm-12" v-for="post in displayedPosts" :key="post._id">
          <div class="card">
            <div class="card-background">
              <img :src="post.thumbnailSmall" alt="Post image" style="height: 66.67%; object-fit: cover;">
            </div>
            <div class="content">
              <div class="card-category">{{ post.categoryName }}</div>
              <router-link :to="`/${pageId}/post/${post._id}`" class="post-link">
                <h3 class="card-heading">{{ post.title }}</h3>
              </router-link>
              <p class="post-date">{{ new Date(post.createdAt).toLocaleDateString() }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import viewNavbar from '@/components/viewNavbar.vue';

export default {
    components: {
        viewNavbar,
    },
  setup() {
    const posts = ref([]);
    const searchQuery = ref('');
    const isLoading = ref(false);
    const route = useRoute();
    const pageId = route.params.webpageId;
    const loading = ref(true);
    const webpageStatus = ref('');

    onMounted(async () => {
      checkWebpageStatus();
    });

    const checkWebpageStatus = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/webpages/${route.params.webpageId}/status`);
        webpageStatus.value = response.data.status;

        if (webpageStatus.value === 'inactive') {
          // Redirect to the maintenance message component
          window.location.href = (`/maintenanceMessage`);
        }
        loading.value = false;
      } catch (error) {
        console.error('Error fetching webpage status:', error);
      }
    };

    const performSearch = async () => {
      isLoading.value = true;
      try {
        const response = await axios.get(`http://localhost:3000/posts/search/${route.params.webpageId}`, {
          params: { q: searchQuery.value }
        });
        posts.value = response.data;
        console.log('Search results:', posts.value);
      } catch (error) {
        console.error('Error performing search:', error.message);
      } finally {
        isLoading.value = false;
      }
    };



    const displayedPosts = computed(() => posts.value);

    return {
      pageId,
      posts,
      displayedPosts,
      searchQuery,
      isLoading,
      performSearch,
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
  
  
  .post-entry {
    margin-bottom: 1rem; /* Adds spacing between post entries */
  }
  
  .post-link {
    text-decoration: none; /* Removes underline */
    color: inherit; /* Inherits the color from parent, removing the default blue */
    transition: color 0.2s; /* Smooth transition for color change */
  }
  
  .post-link:hover {
    color: #007bff; /* Highlight color on hover, change as desired */
  }

  .search-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem; /* You can adjust this as needed for your design */
}

.search-container input[type="text"] {
  flex-grow: 1; /* Allows the input to grow and fill the available space */
  padding: 1rem;
  font-size: 1.5rem;
  border: 2px solid #ddd;
  border-radius: 20px 0 0 20px; /* Rounded corners on the left side */
  border-right: none; /* Removes the right border where the button meets the input */
}
.search-container button {
  padding: 1rem 1.5rem;
  font-size: 1.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 0 20px 20px 0; /* Rounded corners on the right side */
  cursor: pointer;
  transition: background-color 0.2s;
}
.search-container button:hover {
  background-color: #0056b3;
}

/* Loading style */
.loading {
  font-size: 1.5rem;
  margin-top: 2rem;
}
  </style>