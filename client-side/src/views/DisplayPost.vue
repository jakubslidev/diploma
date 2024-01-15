<template>
  <div v-if="!loading">
    <viewNavbar></viewNavbar>
    <div class="home">
      <ViewPost/>
    </div>
  </div>
  </template>
  <script>
  // @ is an alias to /src
  import ViewPost from '@/components/ViewPost.vue'
  import viewNavbar from '@/components/viewNavbar.vue';
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useRoute } from 'vue-router';
  
  export default {
    name: 'DisplayPost',
    components: {
    ViewPost,
    viewNavbar
}, 
        setup() {
            const webpageStatus = ref('');
            const loading = ref(true);
            const route = useRoute();

            const checkWebpageStatus = async () => {
                try {
                    const response = await axios.get(`http://localhost:3000/webpages/${route.params.webpageId}/status`);
                    webpageStatus.value = response.data.status;

                    if (webpageStatus.value === 'inactive') {
                    // Redirect to the maintenance message component
                    window.location.href = (`/maintenanceMessage`);
                    }
                    loading.value = false;
                } catch (error) {
                    console.error('Error fetching webpage status:', error);
                }
                };

                onMounted(() => {
                    checkWebpageStatus();
                });


  }
}

  </script>
  