import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/auth',
    name: 'Auth',
    component: () => import(/* webpackChunkName: "Auth" */ '../views/Auth/authIndex.vue'),
  },
  {
    path: '/',
    name: 'BasicLayout',
    component: () => import(/* webpackChunkName: "BasicLayout" */ '../layout/BasicLayout/index.vue'),
    children: [
      {
        path: '/goods',
        name: 'Goods',
        component: () => import(/* webpackChunkName: "Warehouse" */ '../views/Goods/index.vue'),
      }
    ],
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
