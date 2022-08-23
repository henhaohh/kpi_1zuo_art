import { createRouter, createWebHashHistory } from 'vue-router'

const isAuthenticationed = (to, from, next) => {
  if (sessionStorage.getItem('isAuthenticationed')) {
    next();
  } else {
    next('/login')
  }
}


const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    beforeEnter: isAuthenticationed
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/way',
    name: 'Way',
    component: () => import('@/views/Way.vue'),
    beforeEnter: isAuthenticationed
  },
  {
    path: '/kpi/:type',
    name: 'Kpi',
    component: () => import('@/views/Kpi.vue'),
    beforeEnter: isAuthenticationed,
    children: [
      {
        path: 'index',
        name: 'Kpi_me_index',
        component: () => import('@/views/KPI/Me/Index.vue'),
      },
      {
        path: 'his',
        name: 'Kpi_me_his',
        component: () => import('@/views/KPI/Me/His.vue'),
      },
      {
        path: 'zipin',
        name: 'Kpi_me_zipin',
        component: () => import('@/views/KPI/Me/Zipin.vue'),
        children: [
          {
            path: 'zhanli',
            name: 'Kpi_me_zipin_zhanli',
            component: () => import('@/views/KPI/Me/Zipin/Zhanli.vue'),
          }, {
            path: 'xinyang',
            name: 'Kpi_me_zipin_xinyang',
            component: () => import('@/views/KPI/Me/Zipin/Xinyang.vue'),
          },
        ]
      },
      {
        path: 'koubei',
        name: 'Kpi_me_koubei',
        component: () => import('@/views/KPI/Me/Koubei.vue'),
      },
      {
        path: 'chengji',
        name: 'Kpi_me_chengji',
        component: () => import('@/views/KPI/Me/Chengji.vue'),
      },
      {
        path: 'team',
        name: 'Kpi_team',
        component: () => import('@/views/KPI/Team.vue'),
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
