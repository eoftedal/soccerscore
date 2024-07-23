import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import MatchView from '../views/MatchView.vue';
import MatchEditView from '../views/MatchEditView.vue';
import TestView from '../views/TestView.vue';
import ExportView from '../views/ExportView.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
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
    },
    {
      path: '/test',
      name: 'test',
      component: TestView
    },
    {
      path: '/export',
      name: 'export',
      component: ExportView
    }
  ]
});

export default router;
