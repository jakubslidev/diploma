<!-- ViewPost.vue -->
<template>
  <div class="container">
    <div class="row">
      <!-- Main Content Area -->
      <div class="col-md-8">
        <div v-if="post" class="post-content">
          <h2>{{ post.title }}</h2>
          <div class="post-details" v-html="post.content"></div>
          <p><strong>{{ post.categoryName }}</strong></p>



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
          <!-- <ul class="list-unstyled">
            <li v-for="categoryPost in categoryPosts" :key="categoryPost._id">
              <router-link :to="'/' + $route.params.webpageId + '/post/' + categoryPost._id" >
                <p>{{ categoryPost.title }}</p>
              </router-link>
            </li>
          </ul> -->
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
</template>


<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { Modal } from 'bootstrap';

export default {
  setup() {
    const route = useRoute();
    const post = ref(null);
    const comments = ref([]);
    const newComment = ref('');
    const selectedCommentId = ref(null);
    const reportModal = ref(null); // To hold the reference to the bootstrap modal instance
    const reportReason = ref(''); // To hold the selected report reason
    const additionalInfo = ref(''); // To hold any additional information for the report
    const commentToReport = ref({}); // To hold the comment data that is to be reported
    const newestPosts = ref([]);
    const categoryPosts = ref([]);


    const navigateToPost = (webpageId, postId) => {
     window.location.href = (`/${webpageId}/post/${postId}`);
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
        await fetchComments(route.params.id); // Refresh comments
      } catch (error) {
        console.error('Error submitting comment:', error.message);
      }
    };


      const openReportModal = (comment) => {
        // Save the comment data to the state variable
        commentToReport.value = comment;
        // Reset the form fields
        reportReason.value = '';
        additionalInfo.value = '';
        // Show the modal
        reportModal.value.show();
      };

      const submitReport = async () => {
      // Use post.value._id directly since it's already available in the scope
      if (!reportReason.value) {
        alert('Please select a reason for the report.');
        return;
      }
      try {
        // Send the report to the backend
        await axios.post(`http://localhost:3000/comments/${post.value._id}/report`, {
          commentId: commentToReport.value._id,
          reason: reportReason.value,
          additionalInfo: additionalInfo.value,
        });
        // Close the modal after submitting the report
        reportModal.value.hide();
        // Optional: Add a success message or any other post-report actions
      } catch (error) {
        console.error('Error submitting report:', error.message);
      }
    };

    onMounted(async () => {
      const postId = route.params.id;
      const response = await axios.get(`http://localhost:3000/posts/${postId}`);
      post.value = response.data;
      await fetchComments(postId); // Fetch comments for the post

      reportModal.value = new Modal(document.getElementById('reportModal'), {
      keyboard: false,
      });

      const webpageId = route.params.webpageId; // Assuming webpageId is a route parameter
      await fetchNewestPosts(webpageId);
      console.log(post.value);
      if (post.value && post.value.category) {
        await fetchCategoryPosts(webpageId, post.value.category);
      }
    });

    return {
      post,
      comments,
      newComment,
      reportReason,
      additionalInfo,
      newestPosts,
      categoryPosts,
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
.post-content {
  max-width: 800px; /* Adjust width as needed */
  margin-left: 50px;
  padding-left: 15px; /* Adjust padding as needed */
  margin-bottom: 2rem;
}

.comments-section {
  max-width: 800px; /* Adjust to match post content width */
  margin-left: 0;
  padding-left: 15px; /* Adjust padding to align with the post content */
  margin-top: 2rem;
}

.sidebar-newest-posts,
.sidebar-category-posts {
  padding: 1rem;
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
  background-color: #fff;
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