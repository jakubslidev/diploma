<template>
    <mainNavbar/>
    <div>
      <h2>Login</h2>
      <form @submit.prevent="login">
        <label for="email">Email:</label>
        <input type="email" v-model="email" required />
        <br>
        <br>
        <label for="password">Password:</label>
        <input type="password" v-model="password" required />
        <br>
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import axios from 'axios';
  import mainNavbar from '@/components/mainNavbar.vue';
  
  export default {
    components: {
        mainNavbar
    },
    setup() {
      const email = ref('');
      const password = ref('');
  
      const login = async () => {
        try {
          const response = await axios.post('http://localhost:3000/users/login', {
            email: email.value,
            password: password.value,
          });
  
          const accessToken = response.data.accessToken;
  
          // Save token to local storage
          localStorage.setItem('accessToken', accessToken);
  
          // Handle successful login
          console.log('Login successful!');
        } catch (error) {
          // Handle login error
          console.error('Login error:', error.message);
        }
      };
  
      return { email, password, login };
    },
  };
  </script>
  