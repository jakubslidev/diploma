<!-- EditPost.vue -->
<template>
  <div class="form-card">
    <h2>Edit Post</h2>
    <div class="thumbnail-upload">
      <label for="thumbnail">Post Thumbnail:</label>
      <input type="file" id="thumbnail" @change="uploadThumbnail" accept="image/jpeg, image/png">
      <img v-if="postData.thumbnailSmall" :src="postData.thumbnailSmall" alt="Thumbnail preview" />
    </div>
    <br><br><br>
    <form @submit.prevent="handleSubmit" class="form-grid">
      <label for="title">Title:</label>
      <input v-model="title" type="text" id="title" required><br>
      <label for="content">Content:</label>
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

      <label for="titleColor">Title Color:</label>
      <input type="color" v-model="postData.titleColor" id="titleColor"><br>

      <label for="categoryColor">Category Color:</label>
      <input type="color" v-model="postData.categoryColor" id="categoryColor"><br>

      <button type="submit">Update Post</button>
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
      const selectedSubcategories = ref([]); // Holds the selected subcategories IDs
      const categories = ref([]); // All categories
      const subcategories = ref([]); // Subcategories of the selected category
      const route = useRoute();
      const { cookies } = useCookies(['access_token']);
      const accessToken = cookies.get('access_token');
      const webpageId = ref('');
      const thumbnailPathBig = ref('');
      const thumbnailPathSmall = ref('');
      const titleColor = ref('#ffffff'); // Default white
      const categoryColor = ref('#ffffff'); // Default white
      let selectedCategoryObj = null;
      const postData = ref({});
  
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
          console.log(titleColor);
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

  