<template>
  <MainNavbar />
  <div class="container-fluid" >
    <div class="row" v-if="!loading">
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
          <button v-if="role === 'Admin'"
            class="btn w-100 mb-2"
            :class="{ 'btn-primary': currentView === 'InvitingUsers', 'btn-secondary': currentView !== 'InvitingUsers' }"
            @click="setCurrentView('InvitingUsers')"
          >Invite Users!</button>
          <button
            class="btn w-100 mb-2"
            :class="{ 'btn-primary': currentView === 'trendingPosts', 'btn-secondary': currentView !== 'trendingPosts' }"
            @click="setCurrentView('trendingPosts')"
          >Trending Posts</button>
          <button v-if="role === 'Admin'"
            class="btn w-100 mb-2"
            :class="{ 'btn-primary': currentView === 'editPage', 'btn-secondary': currentView !== 'editPage' }"
            @click="setCurrentView('editPage')"
          >Page Settings</button>
          <router-link
            :to="{ path: '/view/' + $route.params.webpageId }"
            class="btn btn-success w-100 mb-2"
            target="_blank"
            >Display Page</router-link>

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
import InvitingUsers from '@/components/InvitingUsers.vue';
import trendingPosts from '@/components/trendingPosts.vue';
import EditPage from '@/components/EditPage.vue';
import { Offcanvas } from 'bootstrap';

export default {
  components: {
    MainNavbar,
    PostsListUser,
    CategoryAdd,
    InvitingUsers,
    trendingPosts,
    EditPage,
  },
  setup() {
    const role = ref(null);
    const { cookies } = useCookies(['access_token']);
    const accessToken = cookies.get('access_token');
    const route = useRoute();
    const router = useRouter();
    const sidebarVisible = ref(false);
    const currentView = ref('PostsListUser');
    const loading = ref(true);

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

    const fetchRole = async () => {
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
          router.push('/UnauthorizedError');
        }
      } finally {
        loading.value = false;
        console.log("LOADING VALUE: " + loading.value);
      }
    };

    onMounted( async () => {
      await fetchRole();
    });


    return {
      loading,
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

.sidebar {
  padding-top: 1rem;
}


.navbar-toggler.position-fixed {
  z-index: 1050; 
}


.bg-dark {
  background-color: #343a40 !important; 
}

.btn-primary {
  background-color: #007bff; 
  border: none; 
}

.btn-secondary {
  background-color: #6c757d; 
}


main {
  padding-top: 56px; 
}

@media (min-width: 768px) {
  main {
    padding-left: 25%; 
  }
}

@media (max-width: 767.98px) {
  main {
    padding-left: 0;
    padding-right: 0;
  }
}
</style>