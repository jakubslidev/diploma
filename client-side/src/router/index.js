import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import BackOffice from '../views/BackOffice'
import CreatePost from '../views/CreatePost.vue'
import DisplayPost from '../views/DisplayPost.vue'
import CategoryAdd from '../views/CategoryAdd.vue'
import userRegistration from '../views/userRegistration.vue'
const routes = [
  {
    path: '/',
    name: 'startupPage',
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
    path: '/categoryAdd',
    name: 'CategoryAdd',
    component: CategoryAdd,
  },
  {
    path: '/office/:webpageId',
    name: 'office',
    component: BackOffice,
  },
  {
    path:'/office/:webpageId/addPost',
    name:'postCreation',
    component: CreatePost,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
