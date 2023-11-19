<template>
  <div>
    <h2>Create Post</h2>
    <form @submit.prevent="handleSubmit">
      <label for="title">Title:</label>
      <input v-model="title" type="text" id="title" required><br>
      <label for="content">Content:</label><br>
      <textarea v-model="content" id="content" cols="30" rows="10" required></textarea><br>
      <button type="submit">Create Post</button>
    </form>
    <PostListUser :webpageId="webpageId" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import PostListUser from './PostsListUser.vue';
import { useRoute } from 'vue-router';

export default {
  components: {
    PostListUser,
  },
  setup() {
    const title = ref('');
    const content = ref('');
    const webpageId = ref('');
    const route = useRoute();

    const handleSubmit = async () => {
      const accessToken = localStorage.getItem('accessToken');

      try {
        await axios.post(
          `http://localhost:3000/posts/${webpageId.value}/addPost`,
          {
            title: title.value,
            content: content.value,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        title.value = '';
        content.value = '';
      } catch (error) {
        console.error('Error creating post:', error.message);
      }
    };

    // Extract webpageId from the route params
    onMounted(() => {
      webpageId.value = route.params.webpageId;
    });

    return {
      title,
      content,
      webpageId,
      handleSubmit,
    };
  },
};
</script>
