<template>
  <MainNavbar />
  <div class="container my-5">
    <h2 class="mb-4">Your Invitations</h2>
    <div class="list-group">
      <a v-for="invitation in invitations" :key="invitation._id" 
         href="#" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
        You have been invited to manage: <strong>{{ invitation.webpageId }}</strong> as a <strong>{{ invitation.role }}</strong>
        <span>
          <button @click="acceptInvitation(invitation._id)" class="btn btn-success btn-sm mx-1">Accept</button>
          <button @click="declineInvitation(invitation._id)" class="btn btn-danger btn-sm mx-1">Decline</button>
        </span>
      </a>
    </div>
  </div>
</template>
  
  <script setup>
import MainNavbar from '@/components/mainNavbar.vue';
  import { onMounted, ref } from 'vue';
  import axios from 'axios';
  import { useCookies } from 'vue3-cookies';
  
  const { cookies } = useCookies(['access_token']);
  const accessToken = cookies.get('access_token');
  const invitations = ref([]);
  
  const fetchInvitations = async () => {
    try {
      const response = await axios.get('http://localhost:3000/user-invitations/', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      invitations.value = response.data;
    } catch (error) {
      console.error('Error fetching invitations:', error);
    }
  };
  
  const acceptInvitation = async (invitationId) => {
    try {
      const response = await axios.post(`http://localhost:3000/user-invitations/accept/${invitationId}`, {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const newAccessToken = response.data.accessToken;
      // Update the cookie with the new access token
      cookies.set('access_token', newAccessToken, '4h');
      await fetchInvitations(); // Refresh the list after accepting
    } catch (error) {
      console.error('Error accepting invitation:', error);
    }
  };
  
  const declineInvitation = async (invitationId) => {
    try {
      await axios.post(`http://localhost:3000/user-invitations/decline/${invitationId}`, {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      await fetchInvitations(); // Refresh the list after declining
    } catch (error) {
      console.error('Error declining invitation:', error);
    }
  };
  
  onMounted(fetchInvitations);
  </script>
  