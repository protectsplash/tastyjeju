import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import {
  PageNotFound,
  NotAuthenticated,
  Home,
} from '../views/Layout';

const routes = [
  {path: '*', name: 'notfound', component: PageNotFound},
  {path: '/block', name: 'block', component: NotAuthenticated},
  {path: '/', name: 'Home', component: Home},
  {path: '/search', name: 'Search', component: () => import('../views/Layout/Search')},
  {path: '/detail', name: 'Detail', component: () => import('../views/Layout/Detail')},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
