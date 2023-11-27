<template>
  <div>
    <MainNavbar />
    <div class="main-content">
      <h1 class="welcome-title" ref="welcomeTitle"><span id="cursor">{{ dynamicText + "|" }}</span></h1>
      <div class="button-container">
        <button class="get-started-button">GET STARTED</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import MainNavbar from "@/components/mainNavbar.vue";

export default {
  components: {
    MainNavbar,
  },
  setup() {
    const dynamicText = ref('');
    const welcomeTitle = ref(null);

    const typeWriter = () => {
      const text = "WELCOME TO THE WORLD'S EASIEST CONTENT MANAGEMENT SYSTEM";
      let i = 0;
      const speed = 50; // Adjust the typing speed here

      const type = () => {
        if (i <= text.length) {
          dynamicText.value = text.substring(0, i);
          i++;
          setTimeout(type, speed);
        } else {
          const currentText = welcomeTitle.value.textContent;
          const newText = currentText.slice(0, -1);
          welcomeTitle.value.textContent = newText;
        }
      };

      type();
    };

    onMounted(() => {
      typeWriter();
    });

    return { dynamicText, welcomeTitle };
  },
};
</script>

<style scoped>
body {
  font-family: "Mulish", sans-serif;
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
  overflow: hidden; /* Ensure the overflow is hidden */
  white-space: pre-wrap; /* Allow line breaks */
  word-wrap: break-word; /* Break words to the next line if necessary */
}

#cursor {
  display: inline-block; /* Ensure the cursor is displayed inline */
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
