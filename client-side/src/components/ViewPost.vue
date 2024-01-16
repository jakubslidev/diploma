<!-- ViewPost.vue -->
<template>
    <div v-if="loading">
      <p>LOADING</p>
    </div>
    <div v-else>
      <div class="container">
      <div class="row">
      <!-- Main Content Area -->
      <div class="col-md-8">
        <div v-if="post" class="post-content">
          <h2>Title: {{ post.title }}</h2>
          <p><strong>Category: {{ post.categoryName }}</strong></p>    
          <div class="post-details" v-html="post.content" style="text-align: left;">
          </div>      
      <button
    :class="['btn', isLiked ? 'btn-success' : 'btn-outline-secondary', 'animate-button']"
    @click="handleLike(post._id)"
  >
    <i class="fa fa-thumbs-up" aria-hidden="true"></i> Like
  </button>
  
  <button
    :class="['btn', isDisliked ? 'btn-danger' : 'btn-outline-secondary', 'animate-button']"
    @click="handleDislike(post._id)"
  >
    <i class="fa fa-thumbs-down" aria-hidden="true"></i> Dislike
  </button>




          <!-- Comment Section -->
    <div class="comments-section">
      <h3>Comments</h3>
      <div class="comment" v-for="comment in comments" :key="comment._id">
        <div class="comment-text">
          <p>{{ comment.content }}</p>
          <small class="text-muted">Posted on {{ new Date(comment.createdAt).toLocaleString() }}</small>
        </div>
        <button class="btn btn-sm btn-danger report-button" @click="openReportModal(comment)">
          Report
        </button>
      </div>
      <h3>Leave a Comment</h3>
      <form @submit.prevent="submitComment">
        <div class="mb-3">
          <textarea class="form-control" v-model="newComment" required></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
    </div>

    <!-- Sidebar Area -->
    <div class="col-md-4">
        <!-- Sidebar for Newest Posts -->
        <div class="sidebar-newest-posts mb-4">
          <h3>Newest Posts</h3>
          <ul class="list-unstyled">
  <li v-for="newPost in newestPosts" :key="newPost._id" @click="navigateToPost($route.params.webpageId, newPost._id)">
    {{ newPost.title }}
  </li>
</ul>
        </div>

        <!-- Sidebar for Posts from Same Category -->
        <div class="sidebar-category-posts">
          <h3>Posts from This Category</h3>
          <ul class="list-unstyled">
  <li v-for="categoryPost in categoryPosts" :key="categoryPost._id" @click="navigateToPost($route.params.webpageId, categoryPost._id)">
    {{ categoryPost.title }}
  </li>
</ul>
        </div>
      </div>
    </div>
    </div>

  <!-- Bootstrap Report Modal -->
  <div class="modal fade" id="reportModal" ref="reportModal" tabindex="-1" aria-labelledby="reportModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="reportModalLabel">Report Comment</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submitReport">
            <div class="mb-3">
              <select class="form-select" v-model="reportReason">
                <option value="">Select a reason</option>
                <option value="Hate comment">Hate comment</option>
                <option value="Racist">Racist</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div class="mb-3">
              <textarea class="form-control" v-model="additionalInfo" placeholder="Additional information (optional)"></textarea>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-primary" @click="submitReport(post._id)">Report Comment</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
    </div>
    
</template>


<script>
import { ref, onMounted, computed, reactive } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { Modal } from 'bootstrap';
import { useCookies } from 'vue3-cookies';

export default {
  setup() {
    const route = useRoute();
    const post = ref(null);
    const comments = ref([]);
    const newComment = ref('');
    const selectedCommentId = ref(null);
    const reportModal = ref(null);
    const reportReason = ref(''); 
    const additionalInfo = ref(''); 
    const commentToReport = ref({}); 
    const newestPosts = ref([]);
    const categoryPosts = ref([]);
    const loading = ref(true);
    const webpageStatus = ref('');
    const {cookies} = useCookies();


    const likedPosts = reactive(cookies.get('likedPosts') ? cookies.get('likedPosts').split(',') : []);
    const dislikedPosts = reactive(cookies.get('dislikedPosts') ? cookies.get('dislikedPosts').split(',') : []);
    const isLiked = computed(() => likedPosts.includes(post.value._id));
    const isDisliked = computed(() => dislikedPosts.includes(post.value._id));

    const updateCookies = () => {
      cookies.set('likedPosts', likedPosts.join(','));
      cookies.set('dislikedPosts', dislikedPosts.join(','));
    };


    const handleLike = async (postId) => {
  const indexLiked = likedPosts.indexOf(postId);
  const indexDisliked = dislikedPosts.indexOf(postId);

  if (indexLiked > -1) {
    // Post is already liked, remove like
    likedPosts.splice(indexLiked, 1);
  } else {
    // Add like, remove dislike if it exists
    if (indexDisliked > -1) {
      dislikedPosts.splice(indexDisliked, 1);
    }
    likedPosts.push(postId);
  }
  updateCookies();

  try {
    await axios.patch(`http://localhost:3000/posts/${postId}/incrementLike`);
  } catch (error) {
    console.error('Error incrementing like count:', error.message);
  }
}

const handleDislike = async (postId) => {
  const indexDisliked = dislikedPosts.indexOf(postId);
  const indexLiked = likedPosts.indexOf(postId);

  if (indexDisliked > -1) {
    // Post is already disliked, remove dislike
    dislikedPosts.splice(indexDisliked, 1);
  } else {
    // Add dislike, remove like if it exists
    if (indexLiked > -1) {
      likedPosts.splice(indexLiked, 1);
    }
    dislikedPosts.push(postId);
  }
  updateCookies();

  try {
    await axios.patch(`http://localhost:3000/posts/${postId}/incrementDislike`);
  } catch (error) {
    console.error('Error incrementing dislike count:', error.message);
  }
};


    const navigateToPost = (webpageId, postId) => {
     window.location.href = (`/${webpageId}/post/${postId}`);
    };


    const checkWebpageStatus = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/webpages/${route.params.webpageId}/status`);
        webpageStatus.value = response.data.status;

        if (webpageStatus.value === 'inactive') {
          window.location.href = (`/maintenanceMessage`);
        }
        loading.value = false;
      } catch (error) {
        console.error('Error fetching webpage status:', error);
      }
    };


    const fetchNewestPosts = async (webpageId) => {
      try {
        const response = await axios.get(`http://localhost:3000/posts/newest/${webpageId}`);
        newestPosts.value = response.data;
      } catch (error) {
        console.error('Error fetching newest posts:', error.message);
      }
    };

    const fetchCategoryPosts = async (webpageId, categoryId) => {
      try {
        const response = await axios.get(`http://localhost:3000/posts/category/${categoryId}/${webpageId}`);
        categoryPosts.value = response.data;
      } catch (error) {
        console.error('Error fetching category posts:', error.message);
      }
    };

    const fetchComments = async (postId) => {
      try {
        const response = await axios.get(`http://localhost:3000/comments/${postId}`);
        comments.value = response.data;
      } catch (error) {
        console.error('Error fetching comments:', error.message);
      }
    };

    const selectCommentForReporting = (comment) => {
      selectedCommentId.value = comment._id;
    };

    const submitComment = async () => {
      try {
        await axios.post('http://localhost:3000/comments', {
          content: newComment.value,
          postId: route.params.id,
          webpageId: route.params.webpageId
        });
        newComment.value = '';
        await fetchComments(route.params.id);
      } catch (error) {
        console.error('Error submitting comment:', error.message);
      }
    };


      const openReportModal = (comment) => {
        commentToReport.value = comment;
        reportReason.value = '';
        additionalInfo.value = '';
        reportModal.value.show();
      };

      const submitReport = async () => {
      if (!reportReason.value) {
        alert('Please select a reason for the report.');
        return;
      }
      try {
        await axios.post(`http://localhost:3000/comments/${post.value._id}/report`, {
          commentId: commentToReport.value._id,
          reason: reportReason.value,
          additionalInfo: additionalInfo.value,
        });
        reportModal.value.hide();
      } catch (error) {
        console.error('Error submitting report:', error.message);
      }
    };

    onMounted(async () => {
      checkWebpageStatus();
      const postId = route.params.id;
      const response = await axios.get(`http://localhost:3000/posts/${postId}`);
      post.value = response.data;
      await fetchComments(postId); 

      reportModal.value = new Modal(document.getElementById('reportModal'), {
      keyboard: false,
      });

      const webpageId = route.params.webpageId; 
      await fetchNewestPosts(webpageId);
      console.log(post.value);
      if (post.value && post.value.category) {
        await fetchCategoryPosts(webpageId, post.value.category);
      }
      await axios.patch(`http://localhost:3000/posts/${postId}/incrementView`);
    });

    return {
      post,
      comments,
      newComment,
      reportReason,
      additionalInfo,
      newestPosts,
      categoryPosts,
      isLiked,
      isDisliked,
      handleLike,
      handleDislike,
      navigateToPost,
      submitReport,
      submitComment,
      selectCommentForReporting,
      openReportModal,
    };
  },
};
</script>

<style scoped>


.post-details{
  border-bottom: 1px solid black;
}
.post-content {
  max-width: 800px; 
  margin-left: 50px;
  padding-left: 15px; 
  margin-bottom: 2rem;
}

.comments-section {
  max-width: 800px;
  margin-left: 0;
  padding-left: 15px; 
  margin-top: 2rem;
}

.sidebar-newest-posts,
.sidebar-category-posts {
  padding: 1rem;
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
  background-color: #fff;
}

.animate-button {
  transition: background-color 0.3s, color 0.3s;
}

/* Active state */
.btn-success, .btn-danger {
  color: white !important; /* Ensure text color is white */
}

.sidebar-newest-posts h3,
.sidebar-category-posts h3 {
  margin-bottom: 1rem;
}

.sidebar-newest-posts ul,
.sidebar-category-posts ul {
  padding-left: 0;
  list-style-type: none;
}

@media (max-width: 767.98px) {
  .sidebar-newest-posts,
  .sidebar-category-posts {
    margin-bottom: 1.5rem;
  }
}

.comment {
  background-color: #f4f4f4;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
  position: relative;
}

.comment-text {
  margin-bottom: 5px;
}



.comment:hover .comment-options {
  opacity: 1;
}

</style>