<!-- PostsListUser.vue -->
<template>
  <div class="container mt-4">
    <h2 class="mb-4">Posts</h2>

    <!-- Pagination -->
    <div class="mb-3">
    
    <button class="btn btn-secondary" @click="goToPage(currentPage - 1)" :disabled="currentPage === 0">Previous</button>
    <span class="mx-2">Page {{ currentPage + 1 }}</span>
    <button class="btn btn-secondary" @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages - 1">Next</button>
  </div>

    <!-- Toolbar -->
    <div class="d-flex justify-content-between mb-3">
      <div>
        <button class="btn btn-primary" @click="toggleSelectAll">
          {{ isAllSelected ? 'Unselect All' : 'Select All' }}
        </button>
        <button class="btn btn-primary" @click="selectAllOnPage">Select All on Page</button>
      </div>
      <div>
        <!-- Search Bar -->
        <input
          type="text"
          class="form-control"
          v-model="searchText"
          placeholder="Search by post title"
        />
      </div>
    </div>

    <!-- Action confirmation dropdown -->
<div class="mt-4">
  <p>{{ selectedPosts.length }} posts selected</p>
  <div class="d-flex mb-3">
    <select class="form-select me-2" v-model="selectedAction" :disabled="selectedPosts.length === 0">
      <option value="enable">Enable Selected</option>
      <option value="disable">Disable Selected</option>
      <option value="delete" style="color: red;">Delete Selected</option>
      <!-- Add more action options as needed -->
    </select>
    <button class="btn btn-primary" @click="confirmAction" :disabled="selectedPosts.length === 0">Confirm</button>
    <button class="btn btn-secondary ms-2" @click="closeActionModal">Cancel</button>
  </div>
</div>


    <!-- Posts List -->
  <ul class="list-group">
    <li v-for="(post, index) in paginatePosts" :key="post._id" class="list-group-item" :class="{ 'bg-light': index % 2 !== 0 }">
      <div class="d-flex align-items-center">
        <input type="checkbox" class="me-2" v-model="post.selected" @change="handleCheckboxChange(post)" />
        <router-link :to="'/post/' + post._id">{{ post.title }}</router-link>
      </div>
    </li>
  </ul>

  </div>
</template>

<script>
import { ref, onMounted, watchEffect, computed } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { useCookies } from 'vue3-cookies';

export default {
  setup() {
    const posts = ref([]);
    const selectedPosts = ref([]);
    const selectedAction = ref('');
    const searchText = ref('');
    const route = useRoute();
    const currentPage = ref(0);
    const itemsPerPage = 12;
    const totalPages = computed(() => Math.ceil(posts.value.length / itemsPerPage));
    const { cookies } = useCookies(['access_token']);
    const accessToken = cookies.get('access_token');

    const postId = computed(() => {
      // Extract postId from the URL
      return route.params.postId;
    });

    const fetchData = async (webpageId) => {
  try {
    const response = await axios.get(`http://localhost:3000/posts/view/webpage/${webpageId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    posts.value = response.data.map((post) => ({ ...post, selected: false }));
    console.log(posts);
  } catch (error) {
    console.error('Error fetching posts:', error.message);
  }
};


    const toggleSelectAll = () => {
      // Toggle individual checkboxes
      posts.value.forEach((post) => {
        post.selected = !post.selected;
        updateSelectedPosts(post);
      });
    };


    const selectAllOnPage = () => {
      const startIndex = currentPage.value * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;

      const postsOnPage = visiblePosts.value.slice(startIndex, endIndex);
      postsOnPage.forEach((post) => {
        post.selected = !post.selected; // Toggle selection
        updateSelectedPosts(post);
      });
    };

    const confirmAction = async () => {
      try {
        const postIds = selectedPosts.value.map((post) => post._id);

        // Perform the selected action
        if (selectedAction.value === 'delete') {
          await Promise.all(postIds.map((postId) => axios.delete(`http://localhost:3000/posts/${postId}/deleteSelected`)));
          
          // Clear selected posts after successful deletion
          selectedPosts.value = [];
        } else if (selectedAction.value === 'disable' || selectedAction.value === 'enable') {
          const status = selectedAction.value === 'disable' ? 'Draft' : 'Active';
          await Promise.all(postIds.map((postId) => axios.patch(`http://localhost:3000/posts/${postId}/updateStatus`, { status })));
        }

        // Fetch the updated posts
        await fetchData(route.params.webpageId);
      } catch (error) {
        console.error('Error confirming action:', error.message);
      }
    };

    // Dynamic filtering based on search text
    const visiblePosts = computed(() =>
      posts.value.filter((post) => post.title.toLowerCase().includes(searchText.value.toLowerCase()))
    );

    // Computed property to paginate visible posts
    const paginatePosts = computed(() => {
      const startIndex = currentPage.value * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return visiblePosts.value.slice(startIndex, endIndex);
    });

    const goToPage = (page) => {
      currentPage.value = Math.max(0, Math.min(page, totalPages.value - 1));
    };

    const updateSelectedPosts = (post) => {
      // Update selectedPosts based on the state of individual checkboxes
      if (post.selected) {
        selectedPosts.value.push(post);
      } else {
        selectedPosts.value = selectedPosts.value.filter((selectedPost) => selectedPost._id !== post._id);
      }
    };

    const handleCheckboxChange = (post) => {
      updateSelectedPosts(post);
    };

    onMounted(() => {
      const webpageId = route.params.webpageId;
      console.log('webpageId onMounted:', webpageId);

      if (webpageId) {
        fetchData(webpageId);
      }
    });

    watchEffect(() => {
      const webpageId = route.params.webpageId;
      console.log('webpageId watchEffect:', webpageId);

      if (webpageId) {
        fetchData(webpageId);
      }
    });

    return {
      posts,
      selectedPosts,
      selectAllOnPage,
      toggleSelectAll,
      confirmAction,
      handleCheckboxChange,
      selectedAction,
      totalPages,
      paginatePosts,
      goToPage,
      currentPage,
      postId,
      searchText,
      visiblePosts,
      isAllSelected: computed(() => posts.value.every((post) => post.selected)),
    };
  },
};
</script>

