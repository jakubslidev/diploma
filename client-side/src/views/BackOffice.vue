<template>
  <MainNavbar />
  <div class="container-fluid">
    <div class="row">
      <!-- Unified Sidebar -->
      <div
        class="bg-dark text-white sidebar"
        :class="{'col-md-2 d-none d-md-block': isDesktop, 'offcanvas offcanvas-start': !isDesktop}"
        tabindex="-1"
        id="sidebar"
        aria-labelledby="sidebarLabel"
        style="height: 100vh;"
      >
        <div class="offcanvas-header d-md-none">
          <h5 id="sidebarLabel">Menu</h5>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" @click="toggleSidebar"></button>
        </div>
        <div class="offcanvas-body">
          <!-- Sidebar content here -->
          <button
            class="btn w-100 mb-2"
            :class="{ 'btn-primary': currentView === 'PostsListUser', 'btn-secondary': currentView !== 'PostsListUser' }"
            @click="setCurrentView('PostsListUser')"
          >Posts</button>
          <button
            class="btn w-100 mb-2"
            :class="{ 'btn-primary': currentView === 'CategoryAdd', 'btn-secondary': currentView !== 'CategoryAdd' }"
            @click="setCurrentView('CategoryAdd')"
          >Categories</button>
          <!-- ... other buttons ... -->
        </div>
      </div>

      <!-- Button to toggle the sidebar (visible on mobile only) -->
      <button
        v-if="!isDesktop"
        class="navbar-toggler position-fixed top-5 start-0"
        type="button"
        @click="toggleSidebar"
        style="z-index: 1050;"
      >
        <span class="navbar-toggler-icon" style="color: #212529">>></span>
      </button>

      <!-- Main Content Here -->
      <main class="col-12 col-md-10 ms-sm-auto px-md-4">
        <component :is="currentView" />
      </main>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { useCookies } from 'vue3-cookies';
import { useRoute, useRouter } from 'vue-router';
import MainNavbar from "@/components/mainNavbar.vue";
import PostsListUser from "@/components/PostsListUser.vue";
import CategoryAdd from '@/components/CategoryAdd.vue'
import { Offcanvas } from 'bootstrap';

export default {
  components: {
    MainNavbar,
    PostsListUser,
    CategoryAdd,
  },
  setup() {
    const role = ref(null);
    const { cookies } = useCookies(['access_token']);
    const accessToken = cookies.get('access_token');
    const route = useRoute();
    const router = useRouter();
    const sidebarVisible = ref(false);
    const currentView = ref('PostsListUser');

    // Computed property to determine if we are in desktop view
    const isDesktop = computed(() => window.innerWidth >= 768);

    const toggleSidebar = () => {
      sidebarVisible.value = !sidebarVisible.value;
      let sidebarElement = document.getElementById('sidebar');
      let bsOffcanvas = Offcanvas.getInstance(sidebarElement) 
        || new Offcanvas(sidebarElement);

      sidebarVisible.value ? bsOffcanvas.show() : bsOffcanvas.hide();
    };

    const setCurrentView = (viewName) => {
      currentView.value = viewName;
    };

    onMounted(async () => {
      try {
        const response = await axios.get(`http://localhost:3000/webpages/${route.params.webpageId}/role`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        role.value = response.data.role;
        console.log(role.value);
      } catch (error) {
        console.error('Error fetching user role:', error.message);
        if (error.response && error.response.status === 401) {
          // Redirect to login page or error page
          router.push('/UnauthorizedError');
        }
      }
    });


    // Fetch user role on component mount
    const fetchRole = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/webpages/${route.params.webpageId}/role`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        role.value = response.data.role;
      } catch (error) {
        console.error('Error fetching user role:', error.message);
        if (error.response && error.response.status === 401) {
          router.push('/UnauthorizedError');
        }
      }
    };

    fetchRole();

    return {
      role,
      isDesktop,
      toggleSidebar,
      setCurrentView,
      currentView,
    };
  },
};
</script>

<style>
/* Custom styles if needed */
.sidebar {
  padding-top: 1rem;
}

/* Ensure the toggle button is visible above the offcanvas */
.navbar-toggler.position-fixed {
  z-index: 1050; /* Bootstrap offcanvas z-index is 1045 */
}

/* Sidebar styles to match the provided design */
.bg-dark {
  background-color: #343a40 !important; /* Bootstrap dark background */
}

.btn-primary {
  background-color: #007bff; /* Bootstrap primary button color */
  border: none; /* Remove border for full width button style */
}

.btn-secondary {
  background-color: #6c757d; /* Bootstrap secondary button color */
}

/* Style adjustments for main content */
main {
  padding-top: 56px; /* Adjust top padding to avoid overlap with the fixed navbar */
}

@media (min-width: 768px) {
  main {
    padding-left: 25%; /* Adjust for sidebar width */
  }
}

@media (max-width: 767.98px) {
  main {
    padding-left: 0;
    padding-right: 0;
  }
}
</style>