<!-- CreatePost.vue -->
<template>
  <div class="form-card">
    <h2>Create Post</h2>

    <div class="thumbnail-upload">
  <label for="thumbnail">Post Thumbnail:</label>
  <input type="file" id="thumbnail" @change="uploadThumbnail" accept="image/jpeg, image/png">
  <img v-if="thumbnailPathSmall" :src="thumbnailPathSmall" alt="Thumbnail preview" />
    </div>
    <br>
    <br>
    <br>
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

      <button type="submit">Create Post</button>
    </form>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import TextEditor from './TextEditor.vue'
import { useCookies } from 'vue3-cookies';

export default {
  components: {
    TextEditor,
  },
  setup() {
    const title = ref('');
    const content = ref('');
    const webpageId = ref('');
    const selectedCategory = ref('');
    const selectedSubcategory = ref('');
    const selectedCategories = ref([]);
    const selectedSubcategories = ref([]);
    const subcategories = ref([]);
    const categories = ref([]);
    const route = useRoute();
    const thumbnailPathBig = ref('');
    const thumbnailPathSmall = ref('');
    const { cookies } = useCookies(['access_token']);
    let selectedCategoryObj = null;

    const handleSubmit = async () => {
      
      const accessToken = cookies.get('access_token');
      try {
        const currentDate = new Date();
        console.log(content.value);
        await axios.post(
          `http://localhost:3000/posts/${webpageId.value}/addPost`,
          {
            title: title.value,
            content: content.value,
            category: selectedCategory.value,
            categoryName: selectedCategoryObj.name.toString(),
            subcategories: selectedSubcategories.value, // Pass selected subcategories to the backend
            createdAt: currentDate.toISOString(),
            thumbnailBig: thumbnailPathBig.value, 
            thumbnailSmall: thumbnailPathSmall.value,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        title.value = '';
        content.value = '';
        selectedCategories.value = []; // Reset selected categories after submission
        selectedSubcategories.value = []; // Reset selected subcategories after submission
      } catch (error) {
        console.error('Error creating post:', error.message);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/categories/webpage/${webpageId.value}`);
        categories.value = response.data;
      } catch (error) {
        console.error('Error fetching categories:', error.message);
      }
    };

    const uploadThumbnail = async (event) => {
      const file = event.target.files[0];
      if (!file) {
        alert('Please select an image.');
        return;
      }

      const formData = new FormData();
      formData.append('thumbnail', file);

      try {
        const response = await axios.post('http://localhost:3000/media/upload-thumbnail', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        console.log('Thumbnail uploaded:', response.data.smallPath);
        thumbnailPathSmall.value = `http://localhost:3000/${response.data.smallPath}`;
        thumbnailPathBig.value = `http://localhost:3000/${response.data.bigPath}`;
      } catch (error) {
        console.error('Failed to upload thumbnail:', error);
      }
    };

    const fetchSubcategories = () => {
      selectedCategoryObj = categories.value.find(category => category._id === selectedCategory.value);
      if (selectedCategoryObj) {
        subcategories.value = [...selectedCategoryObj.subcategories];
      }
    };

    const addSubcategory = () => {
      // Ensure selectedSubcategory is not an empty string or already in the array
      if (selectedSubcategory.value && !selectedSubcategories.value.includes(selectedSubcategory.value)) {
        selectedSubcategories.value.push(selectedSubcategory.value);
      }

      // Clear the selected subcategory for the next selection
      selectedSubcategory.value = null;
    };

    const removeCategory = (category) => {
      selectedCategories.value = selectedCategories.value.filter(item => item !== category);
    };

    const removeSubcategory = (subcategory) => {
      selectedSubcategories.value = selectedSubcategories.value.filter(item => item !== subcategory);
    };

    watch(content, (newContent) => {
      console.log('Content changed:', newContent);
    });

    // Extract webpageId from the route params and fetch categories on mount
    onMounted(() => {
      webpageId.value = route.params.webpageId;
      fetchCategories();
    });

    return {
      title,
      content,
      webpageId,
      selectedCategory,
      selectedSubcategory,
      selectedCategories,
      selectedSubcategories,
      categories,
      subcategories,
      thumbnailPathSmall,
      thumbnailPathBig,
      uploadThumbnail,
      handleSubmit,
      fetchSubcategories,
      addSubcategory,
      removeCategory,
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
