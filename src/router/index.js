import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/customer',
      name: 'customer.index',
      component: () => import('../views/customers/Index.vue')
    },
    {
      path: '/customer/create',
      name: 'customer.create',
      component: () => import('../views/customers/Create.vue')
    },
    {
      path: '/customer/:id/edit',
      name: 'customer.edit',
      component: () => import('../views/customers/Edit.vue')
    }
  ]
})

export default router
