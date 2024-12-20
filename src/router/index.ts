import { createRouter, createWebHistory } from 'vue-router';

import Dashboard from '../layouts/Dashboard.vue';
import ProductList from '../view/product/ProductList/index.vue';
import OrderList from '../view/order/OrderList.vue';
import Settings from '../view/settings/index.vue';
import Login from '../view/auth/login/index.vue';

const routes = [
  {
    path: '/',
    component: Dashboard,
    children: [
      {
        path: 'products',
        component: ProductList
      },
      {
        path: 'orders',
        component: OrderList
      },
      {
        path: 'settings',
        component: Settings
      }
    ]
  },
  {
    path: '/auth/login',
    component: Login
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
