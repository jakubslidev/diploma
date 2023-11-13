<template>
  <div>
    <h2>Pages</h2>
    <ul>
      <li v-for="page in pages" :key="page._id">
        <a :href="'/office/' + page._id">{{ page.title }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const pages = ref([]);
    const accessToken = localStorage.getItem('accessToken');

    onMounted(async () => {
      try {
        const response = await axios.get('http://localhost:3000/webpages/user-webpages', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        pages.value = response.data;

      } catch (error) {
        console.error('Error fetching user webpages:', error.message);
      }
    });

    return {
      pages,
    };
  },
};
</script>
