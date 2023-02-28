import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/Router'
import {store} from './store/store' 
import Vue3Toastify  from 'vue3-toastify';

createApp(App).use(router).use(Vue3Toastify).use(store).mount('#app')
