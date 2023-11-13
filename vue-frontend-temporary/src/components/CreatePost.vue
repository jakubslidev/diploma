<template>
    <div>
      <h2>Create Post</h2>
      <form @submit.prevent="handleSubmit">
        <label for="title">Teetle:</label>
        <input v-model="title" type="text" id="title" required><br>
        <label for="content">Content:</label><br>
        <textarea v-model="content" id="content" cols="30" rows="10" required></textarea><br>
        <button type="submit">Create Post</button>
      </form>
    </div>
    <PostListUser/>
  </template>
  
  <script>
  import { ref } from 'vue';
  import axios from 'axios';
  import PostListUser from './PostListUser.vue';
  
  export default {
    components: {
      PostListUser,
    },
    setup() {
      const title = ref('');
      const content = ref('');
  
      const handleSubmit = async () => {
        await axios.post('http://localhost:3000/posts', { title: title.value, content: content.value });
        title.value = '';
        content.value = '';
      };
  
      return {
        title,
        content,
        handleSubmit,
      };
    },
  };
  </script>
  