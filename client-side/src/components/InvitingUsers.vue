<!-- AdminInviteUser.vue -->
<template>
  <div class="container py-5">
    <h2 class="mb-4">Invite User to Manage Webpage</h2>

    <div class="input-group mb-3">
      <input type="email" class="form-control" v-model="email" placeholder="Enter user's email" aria-label="User's email" aria-describedby="button-invite">
      <button class="btn btn-outline-secondary" type="button" id="button-invite" @click="sendInvitation">Send Invitation</button>
    </div>

    <div class="mb-3">
      <label for="roleSelect" class="form-label">Select Role</label>
      <select class="form-select" id="roleSelect" v-model="role">
        <option value="Editor">Editor</option>
        <option value="Admin">Admin</option>
      </select>
    </div>

    <div v-if="users.length > 0" class="mt-4">
      <h3>Users Managing This Webpage:</h3>
      <ul class="list-group">
        <li class="list-group-item d-flex justify-content-between align-items-center" v-for="user in users" :key="user.email">
          {{ user.email }} - {{ user.role }}
          <button type="button" class="btn btn-danger btn-sm" @click="removeUser(user.email)">Remove</button>
        </li>
      </ul>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useCookies } from 'vue3-cookies';
import { useRoute } from 'vue-router';

const { cookies } = useCookies(['access_token']);
const accessToken = cookies.get('access_token');
const email = ref('');
const role = ref('editor'); 
const route = useRoute();
const webpageId = ref(route.params.webpageId);
const userRole = ref(null);
const users = ref([]);
const webpageName = ref('');

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
   
  }
};

const fetchUsers = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/webpages/${webpageId.value}/users`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    users.value = response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    
  }
};

const fetchWebpageName = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/webpages/pages/${webpageId.value}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    webpageName.value = response.data.title;
    console.log("RESPONSE" + response.data.title);
  } catch (error) {
    console.error('Error fetching webpage name:', error);
    
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
      webpageName: webpageName.value,
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


const removeUser = async (userEmail) => {
  if (confirm("Are you sure you want to remove this user?")) {
    try {
      await axios.delete(`http://localhost:3000/webpages/${webpageId.value}/remove-user/${encodeURIComponent(userEmail)}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      alert('User removed successfully!');
      fetchUsers(); // Refresh the list of users
    } catch (error) {
      console.error('Error removing user:', error);
    }
  }
};

onMounted(() => {
  fetchUsers();
  fetchWebpageName();
});


</script>



<style scoped>

.remove-user {
  cursor: pointer;
  color: red;
  margin-left: 10px;
}

.remove-user:hover {
  text-decoration: underline;
}
</style>