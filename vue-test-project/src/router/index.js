import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/components',
    name: 'Components',
    component: () => import('@/views/Components.vue')
  }
];

const router = new Router({
  mode: 'hash',
  routes
});

export default router;
