import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/components',
    name: 'Components',
    component: () => import('../views/Components.vue')
  },
  {
    path: '/utils',
    name: 'Utils',
    component: () => import('../views/Utils.vue')
  },
  {
    path: '/utils-test',
    name: 'UtilsTest',
    component: () => import('../views/UtilsTest.vue')
  }
];

const router = new VueRouter({
  mode: 'hash',
  routes
});

export default router;
