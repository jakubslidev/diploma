<template>
    <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <router-link class="navbar-brand" to="/">Home</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/about">About</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/pages">Pages</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/login">Login</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</div>
  </template>
  
  <script>
  export default {
    name: 'mainNavbar',
  };
  </script>
  
  <style scoped>
  /* Add any additional styling if needed */
  </style>
  