<template>
    <mainNavbar/>
    <h1>Unauthorized Error </h1>
    <p>You will be redirected in {{ counter }} seconds...</p>
    <p><router-link :to="'/'">Click here to get redirected immediately</router-link></p>
</template>
  
<script>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import mainNavbar from '@/components/mainNavbar.vue';
  
  export default {
    components: {
      mainNavbar,
    },
    setup() {
      const counter = ref(7);
      const router = useRouter();
  
      onMounted(() => {
        const intervalId = setInterval(() => {
          if (counter.value > 0) {
            counter.value--;
          } else {
            clearInterval(intervalId);
            router.push('/');
          }
        }, 1000);
      });
  
      return {
        counter,
      };
    },
  };
</script>