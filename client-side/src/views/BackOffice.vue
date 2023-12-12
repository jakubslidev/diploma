<template>
  <div>
    <!-- Assuming $route.params.webpageId is available -->
    <p><router-link :to="'/office/' + $route.params.webpageId + '/posts'">Posts</router-link></p>
    <router-link :to="'/office/' + $route.params.webpageId + '/categories'">Categories</router-link>
    <p>Management</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useCookies } from 'vue3-cookies';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const role = ref(null);
    const { cookies } = useCookies(['access_token']);
    const accessToken = cookies.get('access_token');
    const route = useRoute();

    onMounted(async () => {
      try {
        const response = await axios.get(`http://localhost:3000/webpages/${route.params.webpageId}/role`, {
        headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});
        role.value = response.data.role;
        console.log(role.value);
      } catch (error) {
        console.error('Error fetching user role:', error.message);
      }
    });

    return {
      role,
    };
  },
};
</script>