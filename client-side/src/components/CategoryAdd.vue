<template>
  <div class="container my-4">
    <div class="row">
      <div class="col-lg-6">
        <h2 class="mb-3">Add Category</h2>
        <form @submit.prevent="addCategory" class="input-group mb-4">
          <input v-model="categoryName" type="text" class="form-control" placeholder="Category Name" required>
          <button type="submit" class="btn btn-outline-primary">Add</button>
        </form>

        <h2 class="mb-3">Add Subcategory</h2>
        <form @submit.prevent="addSubcategory" class="input-group mb-4">
          <select v-model="selectedCategory" class="form-select">
            <option disabled value="">Select a category</option>
            <option v-for="category in categories" :key="category._id" :value="category._id">{{ category.name }}</option>
          </select>
          <input v-model="subcategoryName" type="text" class="form-control" placeholder="Subcategory Name" required>
          <button type="submit" class="btn btn-outline-secondary">Add</button>
        </form>
      </div>


      <div class="modal fade" id="confirmationModal" tabindex="-1" aria-labelledby="confirmationModalLabel"  aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="confirmationModalLabel">Confirm Deletion</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              Are you sure you want to delete this item?
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-danger" @click="deleteItem">Delete</button>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-6">
        <h2>Categories and Subcategories</h2>
        <ol>
          <li v-for="category in categories" :key="category._id">
            <span class="category-name" @click="confirmCategoryRemoval(category._id)">
              {{ category.name }}
            </span>
            <ol v-if="category.subcategories && category.subcategories.length > 0">
              <li v-for="subcategory in category.subcategories" :key="subcategory" class="subcategory-name" @click="confirmSubcategoryRemoval(category._id, subcategory)">
                {{ subcategory }}
              </li>
            </ol>
          </li>
        </ol>
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
    const categoryName = ref('');
    const subcategoryName = ref('');
    const selectedCategory = ref('');
    const categories = ref([]);
    const route = useRoute(); // Access the route
    const showModal = ref(false);
    const itemToDelete = ref(null);
    const confirmationModal = ref(null);
    

    const addCategory = async () => {
      try {
        await axios.post(`http://localhost:3000/categories?webpageId=${route.params.webpageId}`, {
          name: categoryName.value,
        });

        alert('Category added successfully!');
        categoryName.value = ''; // Reset the input field after successful addition

        // Fetch updated list of categories
        await fetchCategories();
      } catch (error) {
        console.error(error);
        alert('Error adding category. Please try again.');
      }
    };

    const confirmCategoryRemoval = (categoryId) => {
  itemToDelete.value = { type: 'category', id: categoryId };
  confirmationModal.value.show(); // Show the modal
};

const confirmSubcategoryRemoval = (categoryId, subcategoryName) => {
  itemToDelete.value = { type: 'subcategory', id: categoryId, name: subcategoryName };
  confirmationModal.value.show(); // Show the modal
};

    const deleteItem = async () => {
      if (itemToDelete.value.type === 'category') {
        await axios.delete(`http://localhost:3000/categories/${itemToDelete.value.id}`);
      } else {
        await axios.delete(`http://localhost:3000/categories/${itemToDelete.value.id}/subcategory`, {
          data: { name: itemToDelete.value.name },
        });
      }
      await fetchCategories();
      confirmationModal.value.hide();
    };

    const addSubcategory = async () => {
      try {
        await axios.post(`http://localhost:3000/categories/${selectedCategory.value}/subcategory?webpageId=${route.params.webpageId}`, {
          name: subcategoryName.value,
        });

        alert('Subcategory added successfully!');
        subcategoryName.value = ''; // Reset the input field after successful addition
        await fetchCategories();
      } catch (error) {
        console.error(error);
        alert('Error adding subcategory. Please try again.');
      }
    };

    const fetchCategories = async () => {
    const url = `http://localhost:3000/categories/webpage/${route.params.webpageId}`;

    try {
      const response = await axios.get(url);

      categories.value = response.data;
      console.log(categories.value);
    } catch (error) {
      console.error(error);
      alert('Error fetching categories. Please try again.');
    }
  };


    onMounted(async () => {
      confirmationModal.value = new Modal(document.getElementById('confirmationModal'), {
    keyboard: false
  });
  
      await fetchCategories(); // Fetch categories when the component is mounted
    });

    return {
      categoryName,
      subcategoryName,
      selectedCategory,
      categories,
      showModal,
      itemToDelete,
      confirmationModal,
      confirmCategoryRemoval,
      confirmSubcategoryRemoval,
      deleteItem,
      addCategory,
      addSubcategory,
    };
  },
};
</script>

<style scoped>
.container {
  max-width: 900px;
}

.input-group {
  max-width: 500px;
}

.category-name, .subcategory-name {
  cursor: pointer;
  text-decoration: underline;
  text-decoration-color: transparent;
}

.category-name:hover, .subcategory-name:hover {
  text-decoration-color: inherit;
}
</style>