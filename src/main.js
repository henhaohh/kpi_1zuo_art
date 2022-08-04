import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import('bootstrap/dist/css/bootstrap.css')
import('@fortawesome/fontawesome-free/css/all.css')
import('animate.css');
import('./assets/css/base.css')

createApp(App).use(store).use(router).mount('body')
