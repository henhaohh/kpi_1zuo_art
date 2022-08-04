import { createRouter, createWebHistory } from 'vue-router'

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
    component: () => import('../views/Home.vue'),
    beforeEnter: isAuthenticationed
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/way',
    name: 'Way',
    component: () => import('../views/Way.vue'),
    beforeEnter: isAuthenticationed
  },
  {
    path: '/kpi/:type',
    name: 'Kpi',
    component: () => import('../views/Kpi.vue'),
    beforeEnter: isAuthenticationed,
    children: [
      {
        path: 'index',
        name: 'Kpi_me_index',
        component: () => import('../views/KPI/Me/Index.vue'),
      },
      {
        path: 'his',
        name: 'Kpi_me_his',
        component: () => import('../views/KPI/Me/His.vue'),
      },
      {
        path: 'team',
        name: 'Kpi_team',
        component: () => import('../views/KPI/Team.vue'),
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
