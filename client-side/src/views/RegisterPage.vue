<template>
    <div>
      <mainNavbar />
      <div class="register-container">
        <form @submit.prevent="register" class="register-form">
          <h2 class="register-title">Register</h2>
          <input type="text" v-model="firstName" placeholder="First Name" required />
          <input type="email" v-model="email" placeholder="Email" required />
          <input type="password" v-model="password" placeholder="Password" required />
          <input type="password" v-model="confirmPassword" placeholder="Confirm Password" required />
          <div class="terms">
  <input type="checkbox" v-model="agreeToTerms" id="terms" class="terms-checkbox">
  <label for="terms" class="terms-label">I agree to the <a href="/terms">terms and conditions</a>.</label>
</div>
          <button type="submit" class="register-button" :disabled="!canRegister">Register</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  import axios from 'axios';
  import { useCookies } from 'vue3-cookies';
  import mainNavbar from '@/components/mainNavbar.vue';
  import router from '@/router';
  
  export default {
    components: {
      mainNavbar,
    },
    setup() {
      const firstName = ref('');
      const email = ref('');
      const password = ref('');
      const confirmPassword = ref('');
      const agreeToTerms = ref(false);
      const { cookies } = useCookies(['access_token']);
  
      const canRegister = computed(() => {
        return (
          firstName.value.trim() &&
          email.value.trim() &&
          password.value &&
          confirmPassword.value &&
          password.value === confirmPassword.value &&
          agreeToTerms.value
        );
      });
  
  
      const register = async () => {
        if (!canRegister.value) {
          console.error('Please fill out the form correctly.');
          return;
        }
  
        try {
          const response = await axios.post('http://localhost:3000/users/register', {
            firstName: firstName.value,
            email: email.value,
            password: password.value,
          });

            const accessToken = response.data.accessToken;
            console.log("RESPONSE DATA" + response.data.value);
            console.log(accessToken);
            cookies.set('access_token', accessToken, '4h');
            console.log('Registration successful!');
            router.push('/pages');
            
        } catch (error) {
          console.error('Registration error:', error.response.data.message);
        }
      };
  
      return {
        firstName,
        email,
        password,
        confirmPassword,
        agreeToTerms,
        register,
        canRegister,
      };
    },
  };
  </script>
  
  <style scoped>

  
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #2c3e50; /* Match the color of your design */
  color: white;
  text-align: center;
}

.register-form {
  max-width: 400px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #34495e; /* Darker background for the form */
  transition: transform 0.3s ease;
}

.register-form:hover {
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

.register-title{
  padding-top: 20px;
  padding-bottom:25px;
}

.register-button {
  background-color: #008080; /* Accent color */
  color: white;
  padding: 12px;
  font-size: 1.2em;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.register-button:hover {
  background-color: #34a167; /* Darker color on hover */
}
</style>