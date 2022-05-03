import { createRouter, createWebHashHistory } from 'vue-router';
import { user } from '@/service';
import store from '@/store';
import { message } from 'ant-design-vue';

const routes = [
  {
    path: '/auth',
    name: 'Auth',
    component: () => import(/* webpackChunkName: "Auth" */ '../views/Auth/index.vue'),
  },
  {
    path: '/',
    name: 'BasicLayout',
    redirect: '/auth', // 路径为 '/' 时重定向到登录页面
    component: () => import(/* webpackChunkName: "BasicLayout" */ '../layout/BasicLayout/index.vue'),
    children: [
      {
        path: 'goods',
        name: 'Goods',
        component: () => import(/* webpackChunkName: "Goods" */ '../views/Goods/index.vue'),
      },
      {
        path: 'goods/:id',
        name: 'GoodsDetail',
        component: () => import(/* webpackChunkName: "GoodsDetail" */ '../views/GoodsDetail/index.vue'),
      },
      {
        path: 'supplier',
        name: 'Supplier',
        component: () => import(/* webpackChunkName: "Supplier" */ '../views/Supplier/index.vue'),
      },
      {
        path: 'user',
        name: 'User',
        component: () => import(/* webpackChunkName: "User" */ '../views/Users/index.vue'),
      },
      {
        path: 'log',
        name: 'Log',
        component: () => import(/* webpackChunkName: "Log" */ '../views/Log/index.vue'),
      },
      {
        path: 'reset/password',
        name: 'ResetPassword',
        component: () => import(/* webpackChunkName: "ResetPassword" */ '../views/ResetPassword/index.vue'),
      },
      {
        path: 'invite-code',
        name: 'InviteCode',
        component: () => import(/* webpackChunkName: "InviteCode" */ '../views/InviteCode/index.vue'),
      },
      {
        path: 'goods-classify',
        name: 'GoodsClassify',
        component: () => import(/* webpackChunkName: "GoodsClassify" */ '../views/GoodsClassify/index.vue'),
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import(/* webpackChunkName: "Profile" */ '../views/Profile/index.vue'),
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "Dashboard" */ '../views/Dashboard/index.vue'),
      },
      {
        path: 'in-count',
        name: 'InCount',
        component: () => import(/* webpackChunkName: "InCount" */ '../views/InCount/index.vue'),
      },
      {
        path: 'out-count',
        name: 'OutCount',
        component: () => import(/* webpackChunkName: "OutCount" */ '../views/OutCount/index.vue'),
      },
      {
        path: 'warehouse',
        name: 'Warehouse',
        component: () => import(/* webpackChunkName: "Warehouse" */ '../views/Warehouse/index.vue'),
      },
      {
        path: 'warehouse/:id',
        name: 'InventoryDetail',
        component: () => import(/* webpackChunkName: "InventoryDetail" */ '../views/InventoryDetail/index.vue'),
      },
      {
        path: 'customer',
        name: 'Customer',
        component: () => import(/* webpackChunkName: "Customer" */ '../views/Customer/index.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  let res = {};

  try {
    res = await user.info();
  } catch (e) {
    if (e.message.includes('code 401')) {
      res.code = 401;
    };
  };

  const { code } = res;

  if (code === 401) {
    if (to.path === '/auth') {
      next();

      return;
    };

    message.error('认证失败，请重新登录');

    next('/auth');

    return; // 防止网页Application中的_tt被清除后刷新页面出现白屏
  };

  if (!store.state.characterInfo.length) {
    await store.dispatch('getCharacterInfo');
  };

  if (!store.state.userInfo.account) {
    await store.dispatch('getUserInfo');
  };

  await store.dispatch('getGoodsClassify');

  await store.dispatch('getSupplierList');

  await store.dispatch('getGoodsList');

  await store.dispatch('getWarehouseList');

  await store.dispatch('getCustomerList');

  if (to.path === '/auth') {
    next('/dashboard');

    return;
  }; // 已经登录时 通过路径 '/auth' 不会回到登录页面 会直接跳转到商品列表

  next();
});

export default router;
