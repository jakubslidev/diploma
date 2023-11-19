<template>
    <mainNavbar/>
    <PagesList/>
</template>


<script>
import mainNavbar from '@/components/mainNavbar.vue';
import PagesList from '@/components/PagesListUser.vue'

  export default {
    components: {
        mainNavbar,
        PagesList
    }
}

</script>