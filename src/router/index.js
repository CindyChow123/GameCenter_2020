import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Store',
    component: () => import('../views/Store.vue')
  },
  {
    path: '/support',
    name: 'Support',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Support.vue')
  },
  {
    path: '/community',
    name: 'Community',
    component: () => import('../views/Community.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/single_game',
    name: 'Single_game',
    component: () => import('../views/Single_game.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/Admin.vue')
  },
  {
    path: '/racing',
    name: 'Racing',
    component: () => import('../views/Racing.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/register_email',
    name: 'Register_email',
    component: () => import('../views/Register_email.vue')
  },
  {
    path: '/support_developer',
    name: 'Support_developer',
    component: () => import('../views/Support_developer.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
