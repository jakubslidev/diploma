import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreatePost from '../views/CreatePost.vue'
import DisplayPost from '../views/DisplayPost.vue'
import CategoryAdd from '../views/CategoryAdd.vue'
import userLogin from '../views/userLogin.vue'
import userRegistration from '../views/userRegistration.vue'
import BackOfficeMain from '../views/BackOfficeMain.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path:'/create',
    name:'postCreation',
    component: CreatePost,
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
    path: '/login',
    name: 'userLogin',
    component: userLogin,
  },
  {
    path: '/register',
    name: 'userRegistration',
    component: userRegistration,
  },
  {
    path: '/office/:id',
    name: 'BackOfficeMain',
    component: BackOfficeMain,
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
