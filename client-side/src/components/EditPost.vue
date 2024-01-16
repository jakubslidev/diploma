<!-- EditPost.vue -->
<template>
  <div class="form-card">
    <h2>Edit Post</h2>
    <div class="thumbnail-upload">
      <label for="thumbnail">Post Thumbnail:</label>
      <input type="file" id="thumbnail" @change="uploadThumbnail" accept="image/jpeg, image/png">
      <img v-if="postData.thumbnailSmall" :src="postData.thumbnailSmall" alt="Thumbnail preview" />
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
          <input type="color" v-model="postData.titleColor" id="titleColor">
        </div>

        <div class="form-group">
          <label for="categoryColor">Category Color:</label>
          <input type="color" v-model="postData.categoryColor" id="categoryColor">
        </div>
      </div>

      <button type="submit" class="submit-button">Update Post</button>
    </form>
  </div>
</template>
  
  <script>
  import { ref, onMounted} from 'vue';
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
      const selectedSubcategories = ref([]); 
      const categories = ref([]); 
      const subcategories = ref([]); 
      const route = useRoute();
      const { cookies } = useCookies(['access_token']);
      const accessToken = cookies.get('access_token');
      const webpageId = ref('');
      const thumbnailPathBig = ref('');
      const thumbnailPathSmall = ref('');
      const titleColor = ref('#ffffff'); 
      const categoryColor = ref('#ffffff');
      let selectedCategoryObj = null;
      const postData = ref({});
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

  
      const fetchPost = async (postId) => {
      try {
        const response = await axios.get(`http://localhost:3000/posts/${postId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        postData.value = response.data;
        title.value = postData.value.title;
        content.value = postData.value.content;
        selectedCategory.value = postData.value.category;
        selectedSubcategories.value = postData.value.subcategories;
        thumbnailPathBig.value = postData.value.thumbnailBig; // Set current big thumbnail path
        thumbnailPathSmall.value = postData.value.thumbnailSmall; // Set current small thumbnail path
        titleColor.value = postData.value.titleColor || '#ffffff'; // Set current title color or default to white
        categoryColor.value = postData.value.categoryColor || '#ffffff'; // Set current category color or default to white
        fetchSubcategories(); // Update the subcategories list based on the selected category
        console.log(postData.value);
      } catch (error) {
        console.error('Error fetching post data:', error.message);
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

  
      const fetchCategories = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/categories/webpage/${webpageId.value}`);
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
              thumbnailBig: thumbnailPathBig.value, 
              thumbnailSmall: thumbnailPathSmall.value,
              titleColor: postData.value.titleColor,
              categoryColor: postData.value.categoryColor,
            },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          alert('Post updated successfully!');
          window.location.href = (`/office/${route.params.webpageId}`);
        } catch (error) {
          console.error('Error updating post:', error.message);
        }
      };
  
      onMounted(() => {
        webpageId.value = route.params.webpageId;
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
        selectedCategoryObj,
        postData,
        newCategory,
        newSubcategory,
        parentCategory,
        addNewSubcategory,
        addNewCategory,
        uploadThumbnail,
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

  