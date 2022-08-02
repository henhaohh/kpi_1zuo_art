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
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
