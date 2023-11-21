<template>
    <p><router-link :to="'/office/' + $route.params.webpageId + '/posts/addPost'">Add a post!</router-link></p>
    <PostsListUser/>
</template>
    



<script>
    import PostsListUser from '@/components/PostsListUser.vue';
    
      export default {
        components: {
            PostsListUser
        }
    }
    
</script>