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
          <li v-for="category in categories" :key="category._id" class="nav-item dropdown"
              @mouseover="openDropdown(category)" @mouseleave="closeDropdown(category)">
            <div class="d-flex">
              <!-- Actual navigation link -->
              <router-link class="nav-link" :to="'/view/' + webpageId + '/' + category._id">
                {{ category.name }}
              </router-link>
              <!-- Dropdown toggle -->
              <a href="#" class="nav-link dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false"></a>
            </div>
            <ul class="dropdown-menu" :class="{ show: category.showDropdown }">
              <li v-for="subcategory in category.subcategories" :key="subcategory">
                <router-link class="dropdown-item" :to="'/view/' + webpageId + '/' + category._id + '/' + subcategory">
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
        categories.value = response.data.map(category => ({ ...category, showDropdown: false }));
      } catch (error) {
        console.error('Error fetching categories:', error.message);
      }
    };

    const openDropdown = (selectedCategory) => {
      categories.value.forEach(category => {
        category.showDropdown = category._id === selectedCategory._id;
      });
    };

    const closeDropdown = (selectedCategory) => {
      categories.value.forEach(category => {
        if (category._id === selectedCategory._id) {
          category.showDropdown = false;
        }
      });
    };

    onMounted(() => {
      webpageId.value = route.params.webpageId;
      fetchData();
    });

    return {
      categories,
      webpageId,
      openDropdown,
      closeDropdown,
    };
  },
};
</script>


<style scoped>

.dropdown-menu.show {
  display: block;
}

.navbar
        {
            border-bottom:1px solid #60bc92;
        }

</style>
