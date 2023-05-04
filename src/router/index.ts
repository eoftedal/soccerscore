import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MatchView from '../views/MatchView.vue'
import MatchEditView from '../views/MatchEditView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/match/:id',
      name: 'view',
      component: MatchView
    },
    {
      path: '/match/:id/edit',
      name: 'edit',
      component: MatchEditView
    }
  ]
})

export default router
