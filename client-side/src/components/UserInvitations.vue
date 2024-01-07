<!-- UserInvitations.vue -->
<template>
    <MainNavbar />
    <div>
      <h2>Your Invitations</h2>
      <ul>
        <li v-for="invitation in invitations" :key="invitation._id">
          You have been invited to manage: {{ invitation.webpageId }} as a {{ invitation.role }}
          <button @click="acceptInvitation(invitation._id)">Accept</button>
          <button @click="declineInvitation(invitation._id)">Decline</button>
        </li>
      </ul>
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
  