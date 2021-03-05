import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router';

export default function (type?: 'client' | 'server') {
  const routerHistory = type === 'client' ? createWebHistory() : createMemoryHistory();

  return createRouter({
    history: routerHistory,
    routes: [
      {
        path: '/welcome',
        name: '首页',
        component: () => import('@/views/welcome.vue')
      },
      {
        path: '/revenue',
        name: '营收',
        component: () => import('@/views/revenue/index.vue')
      },
      {
        path: '/statistical',
        name: '营收统计',
        component: () => import('@/views/revenue/statistical.vue')
      },
      {
        path: '/sellsave',
        name: '进销存',
        component: () => import('@/views/sellsave/index.vue')
      },
      {
        path: '/test',
        name: '2131',
        component: () => import('@/views/sellsave/analyze/analyzeTest.vue')
      },
      {
        path: '/:catchAll(.*)',
        name: '404',
        component: () => import('@/views/404.vue')
      },
      {
        path: '/test',
        name: 'test',
        component: () => import('@/views/test.vue')
      }
    ]
  });
}
