import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Money from '@/views/Money.vue';
import Label from '@/views/Label.vue';
import Statistic from '@/views/Statistic.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/money'
  },
  {
    path: '/money',
    component: Money
  },
  {
    path: '/label',
    component: Label
  },
  {
    path: '/statistic',
    component: Statistic
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
