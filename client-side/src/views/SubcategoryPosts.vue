<template>
    <viewNavbar/>
    <div class="main-content">
        <SubcategoryPostsList/>
    </div>
</template>
    



<script>
    import SubcategoryPostsList from '@/components/SubcategoryPostsList.vue';
    import viewNavbar from '@/components/viewNavbar.vue';
    
      export default {
        components: {
            SubcategoryPostsList,
            viewNavbar
        }
    }
    
</script>

<style scoped>

body {
    background-color: #1a1a1a;
}
</style>