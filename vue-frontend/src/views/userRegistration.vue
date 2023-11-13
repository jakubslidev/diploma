<template>
    <div>
      <h2>Registration</h2>
      <form @submit.prevent="register">
        <label for="email">Email:</label>
        <input type="email" v-model="email" required />
        
        <label for="password">Password:</label>
        <input type="password" v-model="password" required />
        
        <button type="submit">Register</button>
      </form>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import axios from 'axios';
  
  export default {
    setup() {
      const email = ref('');
      const password = ref('');
  
      const register = async () => {
        try {
          const response = await axios.post('http://localhost:3000/users/register', {
            email: email.value,
            password: password.value,
          });
  
          const accessToken = response.data.accessToken;
  
          // Save token to local storage
          localStorage.setItem('accessToken', accessToken);
  
          // Handle successful registration
          console.log('Registration successful!');
        } catch (error) {
          // Handle registration error
          console.error('Registration error:', error.message);
        }
      };
  
      return { email, password, register };
    },
  };
  </script>
  