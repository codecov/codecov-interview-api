import Vue from 'vue'
import VueRouter from 'vue-router'

import CommitDisplayPageComponent from '@/components/CommitDisplayPageComponent.vue'

const routes = [
  {path: '*', component: CommitDisplayPageComponent },
]

Vue.use(VueRouter)
const router = new VueRouter({
  scrollBehavior (to, from, savedPosition) { return {x: 0, y: 0} },
  mode: 'history',
  routes
})

export default router
