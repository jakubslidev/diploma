import { createRouter, createWebHistory } from 'vue-router'
import PagesListPage from '../views/PagesListPage.vue'
import HomePage from '../views/HomePage.vue'
import BackOffice from '../views/BackOffice'
import CreatePost from '../views/CreatePost.vue'
import DisplayPost from '../views/DisplayPost.vue'
import CategoryAdd from '../views/CategoryAdd.vue'
import userRegistration from '../views/RegisterPage.vue'
import DisplayPosts from '../views/PostsBackOffice.vue'
import PageView from '../views/PageView.vue'
import CategoryPosts from '../views/CategoryPosts.vue'
import UnauthorizedError from '../views/UnauthorizedError.vue'
import DisplayInvitations from '../views/DisplayInvitations.vue'
import EditPost from '../views/EditPost.vue'
import SearchView from '../views/SearchView.vue'
const routes = [
  {
    path: '/pages',
    name: 'startupPage',
    component: PagesListPage,
  },
  {
    path: '/',
    name: 'homePage',
    component: HomePage,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import ('../views/LoginPage.vue')
  },
  {
    path: '/register',
    name: 'userRegistration',
    component: userRegistration,
  },
  {
    path: '/post/:id',
    name: 'DisplayPost',
    component: DisplayPost,
  },
  {
    path: '/office/:webpageId',
    name: 'office',
    component: BackOffice,
  },
  {
    path:'/office/:webpageId/posts',
    name:'postsDisplay',
    component: DisplayPosts,
  },
  {
    path:'/office/:webpageId/posts/addPost',
    name:'postCreation',
    component: CreatePost,
  },
  {
    path: '/office/:webpageId/posts/:postId/edit',
    name: 'EditPost',
    component: EditPost,
  },
  {
    path: '/office/:webpageId/categories',
    name: 'CategoryAdd',
    component: CategoryAdd,
  },
  {
    path: '/view/:webpageId',
    name: 'view',
    component: PageView,
  },
  {
    path: '/view/:webpageId/:categoryId',
    name: 'categoryView',
    component: CategoryPosts,
  },
  {
    path: '/view/:webpageId/search',
    name: 'searchView',
    component: SearchView,
  },
  {
    path: '/unauthorizedError',
    name: 'unauthorizedError',
    component: UnauthorizedError,
  },
  {
    path: '/displayInvitations',
    name: 'DisplayInvitations',
    component: DisplayInvitations,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
