<template>
    <div>
      <div>
        <PostsListUser/>
      </div>
    </div>
</template>
  
<script>
  import PostsListUser from '@/components/PostListUser.vue';
  
  export default {
    name: 'BackOfficeMain',
    components: {
      PostsListUser,
    },
  };
</script>
  