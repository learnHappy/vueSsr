import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router';

export default function (type?: 'client' | 'server') {
  const routerHistory = type === 'client' ? createWebHistory() : createMemoryHistory();

  return createRouter({
    history: routerHistory,
    // ...routes
    routes: [
      {
        path: '/',
        name: '主要功能',
        redirect: 'welcome',
        component: () => import('@/components/index.vue'),
        children: [
          {
            path: '/welcome',
            name: '主页',
            component: () => import('@/views/welcome.vue')
          },
          {
            path: '/user',
            name: '用户',
            component: () => import('@/views/user.vue')
          },
          {
            path: '/reports/revenue',
            name: '营收报表',
            component: () => import('@/views/reports/revenue.vue')
          }
        ]
      },{
        path:'/',
        name: '常规管理',
        // icon: 'el-icon-paperclip',
        component: () => import('@/components/index.vue'),
        children: [
          {
            path: '/setting',
            name: '系统设置',
            component: () => import('@/views/welcome.vue')
          },
          {
            path: '/template',
            name: '模板设置',
            component: () => import('@/views/index.vue')
          }
        ]
      }
    ]
  });
}
