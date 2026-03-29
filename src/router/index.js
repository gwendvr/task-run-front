import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Profil from '../views/Profil.vue'
import Badges from '../views/Badges.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Dashboard },
    { path: '/profil', component: Profil },
    { path: '/badges', component: Badges }
  ]
})

export default router