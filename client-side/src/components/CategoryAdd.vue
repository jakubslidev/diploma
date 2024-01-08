<template>
  <div>
    <h2>Add Category</h2>
    <form @submit.prevent="addCategory">
      <input v-model="categoryName" type="text" placeholder="Category Name" required>
      <button type="submit">Add Category</button>
    </form>

    <h2>Add Subcategory</h2>
    <form @submit.prevent="addSubcategory">
      <select v-model="selectedCategory">
        <option v-for="category in categories" :key="category._id" :value="category._id">{{ category.name }}</option>
      </select>
      <input v-model="subcategoryName" type="text" placeholder="Subcategory Name" required>
      <button type="submit">Add Subcategory</button>
    </form>

    <h2>Categories and Subcategories</h2>
    <ol v-for="category in categories" :key="category._id" :value="category._id">
      <li>{{ category.name }}</li>
      <ol v-if="category.subcategories && category.subcategories.length > 0">
        <li v-for="subcategory in category.subcategories" :key="subcategory">{{ subcategory }}</li>
      </ol>
    </ol>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const categoryName = ref('');
    const subcategoryName = ref('');
    const selectedCategory = ref('');
    const categories = ref([]);
    const route = useRoute(); // Access the route

    const addCategory = async () => {
      try {
        await axios.post(`http://localhost:3000/categories?webpageId=${route.params.webpageId}`, {
          name: categoryName.value,
        });

        alert('Category added successfully!');
        categoryName.value = ''; // Reset the input field after successful addition

        // Fetch updated list of categories
        await fetchCategories();
      } catch (error) {
        console.error(error);
        alert('Error adding category. Please try again.');
      }
    };

    const addSubcategory = async () => {
      try {
        await axios.post(`http://localhost:3000/categories/${selectedCategory.value}/subcategory?webpageId=${route.params.webpageId}`, {
          name: subcategoryName.value,
        });

        alert('Subcategory added successfully!');
        subcategoryName.value = ''; // Reset the input field after successful addition
      } catch (error) {
        console.error(error);
        alert('Error adding subcategory. Please try again.');
      }
    };

    const fetchCategories = async () => {
    const url = `http://localhost:3000/categories/webpage/${route.params.webpageId}`;

    try {
      const response = await axios.get(url);

      categories.value = response.data;
      console.log(categories.value);
    } catch (error) {
      console.error(error);
      alert('Error fetching categories. Please try again.');
    }
  };


    onMounted(async () => {
      await fetchCategories(); // Fetch categories when the component is mounted
    });

    return {
      categoryName,
      subcategoryName,
      selectedCategory,
      categories,
      addCategory,
      addSubcategory,
    };
  },
};
</script>
