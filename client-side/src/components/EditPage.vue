<template>
    <div class="container py-5">
      <h2 class="mb-4">Webpage Management</h2>
      

      <!-- Form to change the title of the webpage -->
    <div class="mb-4">
      <h3>Change Webpage Title:</h3>
      <p>Current Webpage Title: {{ currentTitle }}</p>
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="New title" v-model="newTitle">
        <button class="btn btn-outline-secondary" type="button" @click="changeWebpageTitle">Change Title</button>
      </div>
    </div>

      <!-- Form to change the status of a webpage -->
      <div class="mb-4">
        <h3>Change Webpage Status:</h3>
        
        <div v-if="currentStatus === 'inactive'">
            <p>Current Webpage Status: <span style="color: red;">{{ currentStatus }}</span></p>
        </div>
        <div v-if="currentStatus === 'active'">
            <p>Current Webpage Status: <span style="color: green;">{{ currentStatus }}</span></p>
        </div>
        
        <div class="input-group mb-3">
          <select class="form-select" v-model="newStatus" aria-label="Select status">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <!-- Add more status options here as needed -->
          </select>
          <button class="btn btn-outline-primary" type="button" @click="changeWebpageStatus">Change Status</button>
        </div>
      </div>
  
      <!-- Button to delete a webpage -->
      <div>
        <h3>Delete Webpage:</h3>
        <button class="btn btn-danger" @click="deleteWebpage">Delete Webpage</button>
      </div>
    </div>
  </template>
  <script setup>
  import { ref, onMounted  } from 'vue';
  import axios from 'axios';
  import { useCookies } from 'vue3-cookies';
  import { useRoute } from 'vue-router';
  
  const { cookies } = useCookies(['access_token']);
  const accessToken = cookies.get('access_token');
  const route = useRoute();
  const webpageId = ref(route.params.webpageId);
  const newStatus = ref('active'); // Default to 'active' or fetch current status
  const newTitle = ref(''); // Title input
  const currentTitle = ref('');
  const webpage = ref({});
  const currentStatus = ref('');


  const getWebpageData = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/webpages/pages/${webpageId.value}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    webpage.value = response.data; // Assign the data from the response to the webpage ref
    console.log(webpage.value);
    currentStatus.value = webpage.value.status;
    currentTitle.value = webpage.value.title;
  } catch (error) {
    console.error('Error fetching webpage data:', error);
    // Handle error appropriately
  }
};
  
  const changeWebpageStatus = async () => {
    try {
      await axios.patch(`http://localhost:3000/webpages/${webpageId.value}/status`, {
        status: newStatus.value
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      currentStatus.value = newStatus.value;
      alert('Webpage status updated successfully!');
    } catch (error) {
      console.error('Error changing webpage status:', error);
      // Handle error appropriately
    }
  };

  const changeWebpageTitle = async () => {
  if (!newTitle.value) {
    alert('Please enter a new title.');
    return;
  }
  try {
    await axios.patch(`http://localhost:3000/webpages/${webpageId.value}/status`, {
      title: newTitle.value
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    currentTitle.value = newTitle.value;
    alert('Webpage title updated successfully!');
  } catch (error) {
    console.error('Error changing webpage title:', error);
    // Handle error appropriately
  }
};
  
  const deleteWebpage = async () => {
    if (confirm("Are you sure you want to delete this webpage? This action cannot be undone.")) {
      try {
        await axios.delete(`http://localhost:3000/webpages/${webpageId.value}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        alert('Webpage deleted successfully!');
        // Redirect or update UI as needed
      } catch (error) {
        console.error('Error deleting webpage:', error);
        // Handle error appropriately
      }
    }
  };

  onMounted(() => {
  getWebpageData();
});

</script>