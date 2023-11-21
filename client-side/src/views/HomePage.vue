<template>
    <div>
      <mainNavbar />
      <div class="main-content">
        <h1 class="welcome-title">WELCOME TO THE WORLD'S EASIEST CONTENT MANAGEMENT SYSTEM</h1>
        <div class="button-container">
          <button class="get-started-button">GET STARTED</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import mainNavbar from '@/components/mainNavbar.vue';
  
  export default {
    components: {
      mainNavbar,
    },
  };
  </script>
  
  <style scoped>
  body {
  font-family: 'Mulish', sans-serif;
  margin: 0;
}
  
  .main-content {
    background-color: #1a1a1a;
    color: white;
    text-align: left;
    padding: 50px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  .welcome-title {
    font-size: 4.75em;
    margin-bottom: 20px;
  }
  
  .button-container {
    text-align: left;
  }
  
  .get-started-button {
    background-color: #008080;
    color: white;
    padding: 10px 20px;
    font-size: 2.25em;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .get-started-button:hover {
    background-color: #006666;
  }
  </style>
  