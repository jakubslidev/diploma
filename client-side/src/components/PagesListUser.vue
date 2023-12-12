<template>
  <div>
    <h2>Pages</h2>
    <ul>
      <li v-for="page in pages" :key="page._id">
        <a :href="'/office/' + page._id">{{ page.title }} - {{ page.role }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useCookies } from 'vue3-cookies';

export default {
  setup() {
    const pages = ref([]);
    const { cookies } = useCookies(['access_token']);
    const accessToken = cookies.get('access_token');

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