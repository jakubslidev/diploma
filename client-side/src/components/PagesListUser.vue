<template>
  <MainNavbar />
  <div class="pages-wrapper">
    <div class="pages-container">
      <h2>Hello, user</h2>
      <div class="pages-list">
        <div
          v-for="page in pages"
          :key="page._id"
          class="page-item"
        >
          <div 
            class="page-icon"
            :style="{ backgroundColor: getRandomColor(page.role) }"
          >
            {{ getInitial(page.role) }}
          </div>
          <a :href="'/office/' + page._id" class="page-link">{{ page.title }}</a>
        </div>
        <div class="page-item add-new" @click="showCreateInput = true">
          <div class="page-icon" style="background-color: white">+</div>
          <span class="page-link">Create New Page</span>
        </div>
        <!-- New Page Input and Button -->
        <div v-if="showCreateInput" class="new-page-creation">
          <input type="text" v-model="newPageTitle" placeholder="Enter page name" class="new-page-input"/>
          <button @click="createNewPage" class="btn btn-success">Create!</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useCookies } from 'vue3-cookies';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const pages = ref([]);
    const { cookies } = useCookies(['access_token']);
    const router = useRouter();
    const colors = ['LightBlue', 'Purple', 'Green', 'Mint', 'Orange'];
    const newPageTitle = ref('');
    const showCreateInput = ref(false);

    onMounted(async () => {
      try {
        const accessToken = cookies.get('access_token');
        const response = await axios.get('http://localhost:3000/webpages/user-webpages', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        pages.value = response.data;
        console.log(pages.value);
      } catch (error) {
        console.error('Error fetching user webpages:', error.message);
      }
    });


    const createNewPage = async () => {
  try {
    const accessToken = cookies.get('access_token');
    const response = await axios.post('http://localhost:3000/webpages', {
      title: newPageTitle.value,
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });


    pages.value.push(response.data.savedWebpage); 
    console.log(response.data.accessToken);

    cookies.remove('access_token');
    cookies.set('access_token', response.data.accessToken);

    showCreateInput.value = false;
    newPageTitle.value = '';
  } catch (error) {
    console.error('Error creating new page:', error.message);
  }
};


    const getRandomColor = () => {
      return colors[Math.floor(Math.random() * colors.length)];
    };

    const getInitial = (role) => {
      return role && typeof role === 'string' ? role[0].toUpperCase() : '';
    };

    const redirectToNewPage = () => {
      router.push('/new-page');
    };

    return {
      newPageTitle,
      showCreateInput,
      pages,
      createNewPage,
      getRandomColor,
      getInitial,
      redirectToNewPage,
    };
  },
};
</script>

<style scoped>

.pages-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Use the full height of the viewport */
  background-color: #2c3e50; /* Example background color */
}

.pages-container {
  width: 100%;
  max-width: 400px; /* Maximum width of the container */
  background-color: white;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin: 0 auto;
}

.pages-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.page-item {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px; /* Space between items */
  transition: box-shadow 0.3s ease; /* Smooth transition for the shadow effect */
}

.page-item:hover {
  box-shadow: 2px 2px 2px 4px rgba(0.2, 0.2, 0.2, 0.2); /* Small shadow on hover */
}

.page-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: rgb(0, 0, 0);
  font-size: 24px; /* Adjust the font size as needed */
  margin-right: 10px;
}

.page-link {
  font-size: 16px; /* Adjust the font size as needed */
  text-decoration: none; /* Remove underline from links */
  color: inherit; /* Inherit color from parent */
}

.add-new {
  cursor: pointer;
}


.new-page-creation {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

.new-page-input {
  margin-right: 10px;
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

/* Additional styles for buttons */
.btn-success {
  padding: 5px 15px;
  color: white;
  background-color: #28a745;
  border-color: #28a745;
}

.btn-success:hover {
  background-color: #218838;
  border-color: #1e7e34;
}

</style>
