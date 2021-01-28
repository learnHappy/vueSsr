const routes: any = [
  {
    path: '/',
    name: '主要功能',
    redirect: 'welcome',
    // icon: 'el-icon-s-home',
    component: () => import('@/components/index.vue'),
    children: [
      {
        path: '/welcome',
        name: '主页',
        component: () => import('@/views/welcome.vue')
      },
      {
        path: '/',
        name: '首页',
        component: () => import('@/views/index.vue')
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
  },
  {
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
];
export default {
  routes
};
