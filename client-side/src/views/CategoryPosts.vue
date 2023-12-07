<template>
    <viewNavbar/>
    <div class="main-content">
        <CategoryPostsList/>
    </div>
</template>
    



<script>
    import CategoryPostsList from '@/components/CategoryPostsList.vue';
    import viewNavbar from '@/components/viewNavbar.vue';
    
      export default {
        components: {
            CategoryPostsList,
            viewNavbar
        }
    }
    
</script>

<style scoped>

body {
    background-color: #1a1a1a;
}
</style>