import { createRouter, createWebHistory } from "vue-router";
import Register from '../pages/Register.vue'
import ForgotPassword from '../pages/DidYouForgetPassword.vue'
import { store } from "../store/store";
import Laptops from '../pages/Laptops.vue'
import SharedLayout from '../pages/SharedLayout.vue'
import ChangePassword from '../pages/ChangePassword.vue'
import RegisterLaptop from '../pages/RegisterLaptop.vue'
import ErrorPage from '../pages/ErrorPage.vue'
import Employees from '../pages/Employees.vue'
import AssignLaptop from '../pages/AssignLaptop.vue'
import Dashboard from '../pages/Dashboard.vue'

const router = createRouter({
  history:createWebHistory(),
  linkActiveClass:'router-link-active',
  routes:[
    {name:'home', path:'/', redirect:'/dashboard', component:SharedLayout, meta:{needsAuth:true}, beforeEnter(to, from, next) {
      console.log(to.meta.needsAuth, store.getters.isUser);
      if(!store.getters.isUser) {
        next('/register')
      } else {
        next()
      }
    }, children:[
      {name:'laptopPage', path:'laptops', component:Laptops},
      {name:'dashboardPage', path:'dashboard', component:Dashboard},
      {name:'employeesPage', path:'employees', component:Employees},
      {name:'register laptop', path:'register-laptop', component:RegisterLaptop},
      {name:'assign laptop', path:'assign', component:AssignLaptop},
    ]},
    {name:'register', path:'/register', component:Register},
    {name:'forgotPassword', path:'/forgot-password', component:ForgotPassword},
    // {name:'sharedLayout', path:'/home'},
    {name:'changePassword', path:'/change-password', component:ChangePassword},
    {name:'error', path:'/:pathMatch(.*)', component:ErrorPage},

  ]
})

router.beforeEach((to,from,next) => {
  if( to.meta.needsAuth && !store.getters.isUser) {
    next('/register')
  } else {
    next()
  }  
})



export default router