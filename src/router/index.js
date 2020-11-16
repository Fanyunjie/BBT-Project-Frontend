import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Login'
import Signin from "@/components/Signin";

Vue.use(VueRouter)

 const routes = [
   { path: '/', redirect: 'login'},
    {path:'/login',component:Login},
    {path: '/signin',component: Signin}

 ]

 const router = new VueRouter({
   mode:'history',
  routes
})

export default router
