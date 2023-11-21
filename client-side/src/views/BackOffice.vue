<template>
  <div>
    <!-- Assuming $route.params.webpageId is available -->
    <p><router-link :to="'/office/' + $route.params.webpageId + '/posts'">Posts</router-link></p>
    <router-link :to="'/office/' + $route.params.webpageId + '/categories'">Categories</router-link>
    <p>Management</p>
  </div>
</template>
