<template>
    <CreatePost/>
</template>
  
<script>
  import { ref } from 'vue';
  import axios from 'axios';
  import CreatePost from '@/components/CreatePost.vue'
  
  export default {
    components: {
    CreatePost
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
  