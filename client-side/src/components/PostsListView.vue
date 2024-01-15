<template>
  <div v-if="loading">
    <p>LOADING</p>
  </div>
  <div v-else>
    <div class="container text-center">
    <!-- Main Post (Origin Post-box) -->
    <div class="row main-row align-items-start">
      <div class="col-lg-6" v-if="mainPost && mainPost.thumbnailBig">
        <div class="card card-big">
          <div class="card-background">
            <img :src="mainPost.thumbnailBig" alt="Thumbnail image">
          </div>
          <div class="content">
            <div class="card-category" :style="{ color: mainPost.categoryColor }">
              <p>{{ mainPost.categoryName }}</p>
            </div>
            <router-link :to="'/' + $route.params.webpageId + '/post/' + mainPost._id">
              <h3 class="card-heading" :style="{ color: mainPost.titleColor }">{{ mainPost.title }}</h3>
            </router-link>
          </div>
        </div>
      </div>
      <!-- Other columns for trending posts -->
      <div class="col-lg-6 col-md-6 col-sm-12">
        <h3>Newest posts!</h3>
        <div class="text-box">
          <div v-for="post in limitedPosts" :key="post._id" class="post-entry">
            <router-link :to="'/' + $route.params.webpageId + '/post/' + post._id" class="post-link">
              <h8>{{ post.title }}</h8>
              <p>{{ new Date(post.createdAt).toUTCString() }}</p>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Subsequent Rows (Converted to Cards) -->
    <h1>What's trending?</h1>
    <div class="row align-items-start" v-if="mainPost && mainPost.thumbnailBig">
      <div class="col-lg-4" v-for="(post) in trendingPosts" :key="post._id">
        <div class="card card-small">
          <div class="card-background">
            <img :src="post.thumbnailSmall || 'path/to/default/placeholder.png'" alt="Thumbnail" />
          </div>
          <div class="content">
            <div class="card-category" :style="{color: post.categoryColor}">{{ post.categoryName }}</div>
            <router-link :to="'/' + $route.params.webpageId + '/post/' + post._id">
              <h3 class="card-heading" :style="{color: post.titleColor}">{{ post.title }}</h3>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Subsequent Rows (Converted to Cards) -->
    <h1>All Posts</h1>
    <div class="row align-items-start" v-if="mainPost && mainPost.thumbnailBig">
      <div class="col-lg-4" v-for="(post) in allPosts" :key="post._id">
        <div class="card card-small">
          <div class="card-background">
            <img :src="post.thumbnailSmall || 'path/to/default/placeholder.png'" alt="Thumbnail" />
          </div>
          <div class="content">
            <div class="card-category" :style="{color: post.categoryColor}">{{ post.categoryName }}</div>
            <router-link :to="'/' + $route.params.webpageId + '/post/' + post._id">
              <h3 class="card-heading" :style="{color: post.titleColor}">{{ post.title }}</h3>
            </router-link>
          </div>
        </div>
        <div v-if="loading" class="col-lg-4 text-center">
      <p>Loading more posts...</p>
      <!-- Optionally, you can add a spinner or other loading animation here -->
    </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

export default {
setup() {
    const allPosts = ref([]);
    const trendingPosts = ref([]); // Include trending posts directly from the endpoint
    const mainPost = ref({}); // Main post
    const route = useRoute();
    const limitedPosts = ref([]);
    const webpageStatus = ref('');
    const loading = ref(true);

    const checkWebpageStatus = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/webpages/${route.params.webpageId}/status`);
        webpageStatus.value = response.data.status;

        if (webpageStatus.value === 'inactive') {
          // Redirect to the maintenance message component
          window.location.href = (`/maintenanceMessage`);
        }
        loading.value = false;
      } catch (error) {
        console.error('Error fetching webpage status:', error);
      }
    };

    const fetchData = async () => {
      try {
        // Fetch trending posts from the trending posts endpoint
        const trendingResponse = await axios.get(`http://localhost:3000/webpages/${route.params.webpageId}/posts/noauth`);
        trendingPosts.value = trendingResponse.data.trendingPosts;
        mainPost.value = trendingResponse.data.mainPost;
        console.log(trendingPosts.value);
      } catch (error) {
        console.error('Error fetching posts:', error.message);
      }
    };

    const loadMorePosts = async () => {
  if (loading.value) return;
  loading.value = true;


  try {
      const skip = allPosts.value.length;
      const response = await axios.get(`http://localhost:3000/posts/view/webpage/${route.params.webpageId}/withoutauth/lazy?skip=${skip}&limit=6`, {});
      allPosts.value = [...allPosts.value, ...response.data];
    } catch (error) {
      console.error('Error loading more posts:', error.message);
    } finally {
      loading.value = false;
    }
  // setTimeout(async () => {
  //   try {
  //     const skip = allPosts.value.length;
  //     const response = await axios.get(`http://localhost:3000/posts/view/webpage/${route.params.webpageId}/withoutauth/lazy?skip=${skip}&limit=6`, {});
  //     allPosts.value = [...allPosts.value, ...response.data];
  //   } catch (error) {
  //     console.error('Error loading more posts:', error.message);
  //   } finally {
  //     loading.value = false;
  //   }
  // }, 5000); 
};




const isNearBottom = () => {
  return window.innerHeight + window.scrollY >= document.body.offsetHeight - 500;
};

const handleScroll = () => {
  if (isNearBottom()) {
    loadMorePosts();
  }
};


    const fetchDataLimited = async (webpageId) => {
      try {
        const response = await axios.get(`http://localhost:3000/posts/view/webpage/${webpageId}/limited`); // Adjust the URL to your new endpoint
        limitedPosts.value = response.data; // Assuming the endpoint already sorts and limits the posts
      } catch (error) {
        console.error('Error fetching limited posts:', error.message);
      }
    };

    onMounted(() => {
      checkWebpageStatus();
      fetchData();
      loadMorePosts();
      fetchDataLimited(route.params.webpageId);
      window.addEventListener('scroll', handleScroll);
    });

    onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  });

    return {
      allPosts,
      trendingPosts,
      mainPost,
      limitedPosts,
      loadMorePosts,
      fetchDataLimited,
    };
  },
};
</script>

<style scoped>
.row {
  margin-bottom: 50px;
}

.main-row{
  margin-top: 50px;
}

.card {
  border-radius: 20px;
  position: relative;
  list-style: none;
  gap: 30px;
  transition: .3s ease;
}

.card-background {
  border-radius: 20px;
  overflow: hidden;
  height: 65%;
  background-size: cover;
  background-position: center;
  filter: brightness(.9) saturate(1) contrast(1);
  transition: .3s ease;
}

.card:hover .card-background {
  transform: scale(1.15) translateZ(0);
  background-size: 260px;
}

.card-container:hover .card:not(:hover) {
  transform: scale(.9);
}

.card-container:hover > .card:not(:hover) .card-background,
.card-container:hover > .card:not(:hover) .card-category {
  filter: brightness(.5) saturate(0) contrast(1.2) blur(20px);
}

.content {
  top: 50%;
  left: 0;
  padding: 25px;
  position: absolute;
}

.card-category {
  color: #fff;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 5px;
  margin-bottom: 8px;
  text-transform: uppercase;
}

.card-heading {
  color: #fff;
  font-size: 25px;
  line-height: 1;
  text-shadow: 2px 2px 20px rgba(0, 0, 0, .2);
}

/* New class for the first card in each row */
.card-big {
  width: 600px; /* Adjusted width for the big card */
}

/* New class for the rest of the cards in each row */
.card-small {
  width: 400px;
}


.post-entry {
  margin-bottom: 1rem; /* Adds spacing between post entries */
  font-size: 15px;
}

.post-link {
  text-decoration: none; /* Removes underline */
  color: inherit; /* Inherits the color from parent, removing the default blue */
  transition: color 0.2s; /* Smooth transition for color change */
}

.post-link:hover {
  color: #007bff; /* Highlight color on hover, change as desired */
}
</style>