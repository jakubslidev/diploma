<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <router-link class="navbar-brand" :to="'/view/' + webpageId">Home</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li v-for="category in categories" :key="category._id" class="nav-item" :class="{ 'active': category.active }"
                @mouseover="showSubcategories(category)">
              <router-link class="nav-link" :to="'/view/' + webpageId + '/' + category._id">{{ category.name }}</router-link>
              <ul v-if="category.active && category.subcategories" class="subcategories">
                <li v-for="subcategory in category.subcategories" :key="subcategory._id">
                  <router-link class="nav-link" :to="'/view/' + webpageId + '/' + category._id + '/' + subcategory._id">
                    {{ subcategory }}
                  </router-link>
                </li>
              </ul>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="'/view/' + webpageId + '/search'">Search</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useRoute } from 'vue-router';
  
  export default {
    setup() {
      const categories = ref([]);
      const webpageId = ref('');
      const route = useRoute();
  
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/categories/webpage/${webpageId.value}`);
          categories.value = response.data;
        } catch (error) {
          console.error('Error fetching categories:', error.message);
        }
      };
  
      const showSubcategories = async (category) => {
        if (!category.subcategories) {
          try {
            const response = await axios.get(`http://localhost:3000/categories/${category._id}/subcategories`);
            category.subcategories = response.data;
          } catch (error) {
            console.error('Error fetching subcategories:', error.message);
          }
        }
        // Toggle the 'active' class to show/hide subcategories
        category.active = !category.active;
      };
  
      onMounted(() => {
        // Extract webpageId from the URL
        const params = route.params;
        webpageId.value = params.webpageId;
        fetchData();
      });
  
      return {
        categories,
        webpageId,
        showSubcategories,
      };
    },
  };
  </script>
  <style scoped>
  /* Add your custom styles here */
  .navbar-nav li .subcategories {
    position: absolute;
    background-color: #fff;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    display: none;
    left: 0;
  }
  
  .navbar-nav li.active .subcategories {
    display: block;
  }
  
  @media (max-width: 991.98px) {
    .navbar-nav li .subcategories {
      position: relative;
      box-shadow: none;
    }
  }
  </style>