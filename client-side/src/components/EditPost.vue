<template>
    <div class="form-card">
      <h2>Edit Post</h2>
      <form @submit.prevent="handleSubmit" class="form-grid">
      <label for="title">Title:</label>
      <input v-model="title" type="text" id="title" required><br>
      <label for="content">Content:</label><br>
      <div>
    <TextEditor v-model="content" />

    <div class="content">
      <h3>Content</h3>
      <pre><code>{{ content }}</code></pre>
    </div>
  </div>


      <label for="category">Category:</label>
      <select v-model="selectedCategory" @change="fetchSubcategories">
        <option v-for="category in categories" :key="category._id" :value="category._id">{{ category.name }}</option>
      </select><br>

      <label for="subcategory">Subcategory:</label>
      <select v-model="selectedSubcategory" @change="addSubcategory">
        <option v-for="subcategory in subcategories" :key="subcategory">{{ subcategory }}</option>
      </select><br>

      <label>Selected Categories:</label>
      <ul>
        <li v-for="category in selectedCategories" :key="category">
          {{ category }}
          <span @click="removeCategory(category)">[X]</span>
        </li>
      </ul>

      <label>Selected Subcategories:</label>
      <ul>
        <li v-for="subcategory in selectedSubcategories" :key="subcategory">
          {{ subcategory }}
          <span @click="removeSubcategory(subcategory)">[X]</span>
        </li>
      </ul>

      <button type="submit">Edit Post</button>
    </form>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useRoute } from 'vue-router';
  import TextEditor from './TextEditor.vue';
  import { useCookies } from 'vue3-cookies';
  
  export default {
    components: {
      TextEditor,
    },
    setup() {
      const title = ref('');
      const content = ref('');
      const selectedCategory = ref('');
      const selectedSubcategory = ref('');
      const selectedSubcategories = ref([]); // Holds the selected subcategories IDs
      const categories = ref([]); // All categories
      const subcategories = ref([]); // Subcategories of the selected category
      const route = useRoute();
      const { cookies } = useCookies(['access_token']);
      const accessToken = cookies.get('access_token');
  
      const fetchPost = async (postId) => {
        try {
          const response = await axios.get(`http://localhost:3000/posts/${postId}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          const postData = response.data;
          title.value = postData.title;
          content.value = postData.content;
          selectedCategory.value = postData.category; // Assuming 'category' is the ID
          selectedSubcategories.value = postData.subcategories; // Assuming 'subcategories' is an array of IDs
          fetchSubcategories(); // Update the subcategories list based on the selected category
        } catch (error) {
          console.error('Error fetching post data:', error.message);
        }
      };
  
      const fetchCategories = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/categories`);
          categories.value = response.data;
        } catch (error) {
          console.error('Error fetching categories:', error.message);
        }
      };
  
      const fetchSubcategories = () => {
        const selectedCategoryObj = categories.value.find(category => category._id === selectedCategory.value);
        if (selectedCategoryObj) {
          subcategories.value = [...selectedCategoryObj.subcategories];
        }
      };
  
      const addSubcategory = () => {
        if (selectedSubcategory.value && !selectedSubcategories.value.includes(selectedSubcategory.value)) {
          selectedSubcategories.value.push(selectedSubcategory.value);
        }
        selectedSubcategory.value = null;
      };
  
      const removeSubcategory = (subcategory) => {
        selectedSubcategories.value = selectedSubcategories.value.filter(item => item !== subcategory);
      };
  
      const handleSubmit = async () => {
        try {
          await axios.patch(
            `http://localhost:3000/posts/${route.params.postId}`,
            {
              title: title.value,
              content: content.value,
              category: selectedCategory.value,
              subcategories: selectedSubcategories.value,
            },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          alert('Post updated successfully!');
        } catch (error) {
          console.error('Error updating post:', error.message);
        }
      };
  
      onMounted(() => {
        if (route.params.postId) {
          fetchPost(route.params.postId);
          fetchCategories();
        }
      });
  
      return {
        title,
        content,
        selectedCategory,
        selectedSubcategory,
        categories,
        subcategories,
        selectedSubcategories,
        handleSubmit,
        fetchSubcategories,
        addSubcategory,
        removeSubcategory,
      };
    },
  };
  </script>

<style scoped>
.form-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
  margin-bottom: 20px;
}

.form-grid label, .form-grid input, .form-grid select {
  margin-bottom: 10px;
}

button {
  background-color: #0055ff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #003399;
}

.category-tag {
  display: inline-block;
  background: #e0e0e0;
  border-radius: 20px;
  padding: 5px 10px;
  margin-right: 5px;
  cursor: pointer;
}

.tag-remove {
  margin-left: 10px;
  color: red;
  cursor: pointer;
}

</style>

  