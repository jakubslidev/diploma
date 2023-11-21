<template>
    <mainNavbar/>
    <div class="main-content">
        <PostsListView/>
    </div>
</template>
    



<script>
    import PostsListView from '@/components/PostsListView.vue';
    import mainNavbar from '@/components/mainNavbar.vue';
    
      export default {
        components: {
            PostsListView,
            mainNavbar
        }
    }
    
</script>

<style scoped>

body {
    background-color: #1a1a1a;
}
</style>