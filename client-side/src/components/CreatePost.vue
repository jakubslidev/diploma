<!-- CreatePost.vue -->
<template>
  <div class="form-card">
    <h2>Create Post</h2>

    <div class="thumbnail-upload">
      <label for="thumbnail">Post Thumbnail:</label>
      <input type="file" id="thumbnail" @change="uploadThumbnail" accept="image/jpeg, image/png">
      <img v-if="thumbnailPathSmall" :src="thumbnailPathSmall" alt="Thumbnail preview" />
    </div>

    <form @submit.prevent="handleSubmit" class="form-grid">
      <div class="form-group">
        <label for="title">Title:</label>
        <input v-model="title" type="text" id="title" required>
      </div>

      <div class="form-group">
        <label for="content">Content:</label>
        <TextEditor v-model="content" />
      </div>

      <div class="category-section">
        <div class="form-group">
          <label for="newCategory">New Category:</label>
          <input v-model="newCategory" type="text" id="newCategory" placeholder="Enter new category name">
          <button @click="addNewCategory">Add</button>
        </div>

        <div class="form-group">
          <label for="newSubcategory">New Subcategory:</label>
          <input v-model="newSubcategory" type="text" id="newSubcategory" placeholder="Enter new subcategory name">
        </div>

        <div class="form-group">
          <label for="parentCategory">Parent Category:</label>
          <select v-model="parentCategory">
            <option v-for="category in categories" :key="category._id" :value="category._id">{{ category.name }}</option>
          </select>
          <button @click="addNewSubcategory">Add Subcategory</button>
        </div>
      </div>

      <div class="selection-section">
        <div class="form-group">
          <label for="category">Category:</label>
          <select v-model="selectedCategory" @change="fetchSubcategories">
            <option v-for="category in categories" :key="category._id" :value="category._id">{{ category.name }}</option>
          </select>
        </div>

        <div class="form-group">
          <label for="subcategory">Subcategory:</label>
          <select v-model="selectedSubcategory" @change="addSubcategory">
            <option v-for="subcategory in subcategories" :key="subcategory">{{ subcategory }}</option>
          </select>
        </div>
      </div>

      <label>Selected Subcategories:</label>
      <ul>
        <li v-for="subcategory in selectedSubcategories" :key="subcategory">
          {{ subcategory }}
          <span @click="removeSubcategory(subcategory)">[X]</span>
        </li>
      </ul>

      <div class="color-selection">
        <div class="form-group">
          <label for="titleColor">Title Color:</label>
          <input type="color" v-model="titleColor" id="titleColor">
        </div>

        <div class="form-group">
          <label for="categoryColor">Category Color:</label>
          <input type="color" v-model="categoryColor" id="categoryColor">
        </div>
      </div>

      <button type="submit" class="submit-button">Create Post</button>
    </form>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
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
    const titleColor = ref('#ffffff'); 
    const categoryColor = ref('#ffffff'); 
    const { cookies } = useCookies(['access_token']);
    let selectedCategoryObj = null;
    const newCategory = ref('');
    const newSubcategory = ref('');
    const parentCategory = ref('');


    const addNewCategory = async () => {
        if (!newCategory.value) {
            alert('Please enter a category name.');
            return;
        }
        // Add logic to post the new category to the server
        try {
            await axios.post(`http://localhost:3000/categories?webpageId=${webpageId.value}`, {
                name: newCategory.value,
            });
            newCategory.value = '';
            fetchCategories(); // Refresh the category list
        } catch (error) {
            console.error('Error adding new category:', error);
        }
    };

    const addNewSubcategory = async () => {
        if (!newSubcategory.value || !parentCategory.value) {
            alert('Please enter a subcategory name and select a parent category.');
            return;
        }
        // Add logic to post the new subcategory to the server
        try {
            await axios.post(`http://localhost:3000/categories/${parentCategory.value}/subcategory`, {
                name: newSubcategory.value,
            });
            newSubcategory.value = '';
            fetchCategories(); // Refresh the category and subcategory list
        } catch (error) {
            console.error('Error adding new subcategory:', error);
        }
    };

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
            subcategories: selectedSubcategories.value, 
            createdAt: currentDate.toISOString(),
            thumbnailBig: thumbnailPathBig.value, 
            thumbnailSmall: thumbnailPathSmall.value,
            titleColor: titleColor.value,
            categoryColor: categoryColor.value
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        title.value = '';
        content.value = '';
        selectedCategories.value = [];
        selectedSubcategories.value = [];
        window.location.href = (`/office/${route.params.webpageId}`);
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
      
      if (selectedSubcategory.value && !selectedSubcategories.value.includes(selectedSubcategory.value)) {
        selectedSubcategories.value.push(selectedSubcategory.value);
      }

      
      selectedSubcategory.value = null;
    };

    const removeCategory = (category) => {
      selectedCategories.value = selectedCategories.value.filter(item => item !== category);
    };

    const removeSubcategory = (subcategory) => {
      selectedSubcategories.value = selectedSubcategories.value.filter(item => item !== subcategory);
    };


    
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
      titleColor,
      categoryColor,
      newCategory,
      newSubcategory,
      parentCategory,
      addNewSubcategory,
      addNewCategory,
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
  max-width: 1200px;
  margin: auto;
  padding: 20px;
  border: 1px solid #eee;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="text"], select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  background-color: #007bff;
  color: white;
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.thumbnail-upload img {
  max-width: 100px;
  margin-top: 10px;
}

.submit-button {
  background-color: #28a745;
}

.submit-button:hover {
  background-color: #218838;
}
</style>
