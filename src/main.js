import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/Router'
import {store} from './store/store' 
import Vue3Toastify  from 'vue3-toastify';
import VueApexCharts from 'vue3-apexcharts'

createApp(App).use(router).use(Vue3Toastify).use(VueApexCharts).use(store).mount('#app')
