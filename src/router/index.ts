import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import { Views } from '../views';

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'Home', component: Views.Home },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;