<template>
  <div>
    <mainNavbar />
    <div class="login-container">
      <form @submit.prevent="login" class="login-form">
        <h2 class="login-title">Login</h2>
        <input type="email" v-model="email" placeholder="Email" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <button type="submit" class="login-button">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import { useCookies } from 'vue3-cookies';
import mainNavbar from '@/components/mainNavbar.vue';
import router from '@/router';

export default {
  components: {
    mainNavbar,
  },
  setup() {
    const email = ref('');
    const password = ref('');
    const { cookies } = useCookies(['access_token']);

    const login = async () => {
      try {
        const response = await axios.post('http://localhost:3000/users/login', {
          email: email.value,
          password: password.value,
        });

        const accessToken = response.data.accessToken;
        console.log('Access Token:', accessToken);

        // Save token as a cookie using vue3-cookies
        cookies.set('access_token', accessToken, '4h');
        console.log('Cookie set successfully');

        // Log cookies for debugging
        console.log('Cookies:', cookies.getAll());

        // Handle successful login
        console.log('Login successful!');
        router.push('/pages');
        console.log('After router push'); // Log to check if this line is reached
      } catch (error) {
        // Handle login error
        console.error('Login error:', error.message);
        console.log('Error occurred during login');
      }
    };

    return { email, password, login, cookies };
  },
};
</script>


<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #2c3e50; /* Match the color of your design */
  color: white;
  text-align: center;
}

.login-form {
  max-width: 400px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #34495e; /* Darker background for the form */
  transition: transform 0.3s ease;
}

.login-form:hover {
  transform: scale(1.02);
}

input {
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  box-sizing: border-box;
  border: none;
  border-radius: 4px;
}

.login-title{
  padding-top: 20px;
  padding-bottom:25px;
}

.login-button {
  background-color: #008080; /* Accent color */
  color: white;
  padding: 12px;
  font-size: 1.2em;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-button:hover {
  background-color: #34a167; /* Darker color on hover */
}
</style>
