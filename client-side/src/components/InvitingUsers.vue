<!-- AdminInviteUser.vue -->
<template>
  <div>
    <h2>Invite User to Manage Webpage</h2>
    <input type="email" v-model="email" placeholder="Enter user's email" />
    <select v-model="role">
      <option value="Editor">Editor</option>
      <option value="Admin">Admin</option>
    </select>
    <button @click="sendInvitation">Send Invitation</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useCookies } from 'vue3-cookies';
import { useRoute } from 'vue-router';

const { cookies } = useCookies(['access_token']);
const accessToken = cookies.get('access_token');
const email = ref('');
const role = ref('editor'); // Default role or make it dynamic as needed
const route = useRoute();
const webpageId = ref(route.params.webpageId);
const userRole = ref(null);

const fetchRole = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/webpages/${webpageId.value}/role`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    userRole.value = response.data.role;
  } catch (error) {
    console.error('Error fetching user role:', error);
    // Handle unauthorized error or redirect as needed
  }
};

const sendInvitation = async () => {
  await fetchRole();

  if (userRole.value !== 'Admin') {
    alert('Only admins can send invitations.');
    return;
  }

  try {
    await axios.post('http://localhost:3000/user-invitations', {
      email: email.value,
      role: role.value,
      webpageId: webpageId.value,
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    alert('Invitation sent successfully!');
  } catch (error) {
    console.error('Error sending invitation:', error);
  }
};
</script>

