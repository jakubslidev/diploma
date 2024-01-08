<template>
  <div class="container text-center">
    <!-- First Row -->
    <div class="row main-row align-items-start">
      <!-- First Column (Original Post-box) -->
      <div class="col-lg-6" v-if="posts.length > 0 && posts[0].thumbnailBig">
        <div class="card card-big">
          <div class="card-background">
            <img :src="posts[0].thumbnailBig" alt="Thumbnail image">
          </div>
          <div class="content">
            <div class="card-category" :style="{ color: posts[0].categoryColor }">
              <p v-if="posts.length > 0">{{ posts[0].categoryName }}</p>
            </div>
            <div v-if="posts.length > 0">
              <router-link :to="'/post/' + posts[0]._id">
                <h3 class="card-heading" v-if="posts.length > 0" :style="{ color: posts[0].titleColor }">{{ posts[0].title }}</h3>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <!-- Second Column (Modified to display 10 newest posts) -->
      <div class="col-lg-6 col-md-6 col-sm-12">
        <div class="text-box">
          <div v-for="(post) in displayedPosts2" :key="post._id" class="post-entry">
            <router-link :to="'/post/' + post._id" class="post-link">
              <h8>{{ post.title }}</h8>
            </router-link>
          <p>{{ new Date(post.createdAt).toUTCString() }}</p>
        </div>
      </div>
    </div>  
    </div>
    <!-- Subsequent Rows (Converted to Cards) -->
    <div class="row align-items-start" v-if="posts.length > 0 && posts[0].thumbnailBig">
      <div class="col-lg-4" v-for="(post, index) in displayedPosts" :key="post._id">
    <div class="card card-small">
      <div class="card-background">
        <!-- This is not necessary since you already have the post object, but here's how you could use the index: -->
        <img :src="posts[index+1].thumbnailSmall || 'path/to/default/placeholder.png'" alt="Thumbnail" />
      </div>
          <div class="content">
            <div class="card-category" :style="{color: posts[index+1].categoryColor}">{{ post.categoryName }}</div>
            <router-link :to="'/post/' + post._id">
              <h3 class="card-heading" :style="{color: posts[index+1].titleColor}">{{ post.title }}</h3>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watchEffect, computed } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const posts = ref([]);
    const limitedPosts = ref([]); // New ref to hold the 10 posts from the new endpoint
    const route = useRoute();

    const fetchData = async (webpageId) => {
      try {
        const response = await axios.get(`http://localhost:3000/posts/view/webpage/${webpageId}/withoutauth`);
        posts.value = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        console.log(posts);
      } catch (error) {
        console.error('Error fetching posts:', error.message);
      }
    };

    // New function to fetch only 10 newest posts
    const fetchDataLimited = async (webpageId) => {
      try {
        const response = await axios.get(`http://localhost:3000/posts/view/webpage/${webpageId}/limited`); // Adjust the URL to your new endpoint
        limitedPosts.value = response.data; // Assuming the endpoint already sorts and limits the posts
      } catch (error) {
        console.error('Error fetching limited posts:', error.message);
      }
    };


    onMounted(() => {
      const webpageId = route.params.webpageId;
      if (webpageId) {
        fetchData(webpageId);
        fetchDataLimited(webpageId); // Fetch the limited posts when the component mounts
      }
    });

    watchEffect(() => {
      const webpageId = route.params.webpageId;
      if (webpageId) {
        fetchData(webpageId);
        fetchDataLimited(webpageId); // Fetch the limited posts when the webpage ID changes
      }
    });

    const displayedPosts = computed(() => posts.value.slice(1, 7));

    // Now simply returning the limitedPosts as it should already contain 10 posts
    const displayedPosts2 = computed(() => limitedPosts.value);

    return {
      posts,
      displayedPosts,
      displayedPosts2,
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