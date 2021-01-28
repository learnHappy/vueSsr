const express = require('express');
const server = express();
server.use((req, res, next) => {
  res.header('Content-Type', 'application/json;charset=UTF-8');
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, PUT, DELETE');
  res.header('Allow', 'GET, POST, PATCH, OPTIONS, PUT, DELETE');
  next();
});
server.get('/list', (req, res) => {
  const names = ['Orange', 'Apricot', 'Apple', 'Plum', 'Pear', 'Pome', 'Banana', 'Cherry', 'Grapes', 'Peach'];

  const list = names.map((name, id) => {
    return {
      id: ++id,
      name,
      price: Math.ceil(Math.random() * 100)
    };
  });

  res.end(JSON.stringify({
    code: 0,
    data: list,
    message: ''
  }));
});

// 获取菜单数据
server.get("/menus", (req, res) => {
  res.header('Content-Type', 'application/json;charset=UTF-8');
  const routes = [{
    path: '/welcome',
    name: '主要功能',
    icon: 'el-icon-s-home',
    component: () => import('@/components/index.vue'),
    children: [{
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
      },
    ]
  }, {
    name: '常规管理',
    icon: 'el-icon-paperclip',
    component: () => import('@/components/index.vue'),
    children: [{
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
  }];
  res.end(JSON.stringify(routes));
})

server.listen(5656, () => {
  console.log('listen at http://localhos:5656/');
});