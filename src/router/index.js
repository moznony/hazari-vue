import { createRouter, createWebHistory } from 'vue-router'

import Home from '../pages/Home.vue'
import About from '../pages/About.vue'
import Privacy from '../pages/Privacy.vue'
import Terms from '../pages/Terms.vue'
import Contact from '../pages/Contact.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/privacy', component: Privacy },
  { path: '/terms', component: Terms },
  { path: '/contact', component: Contact }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router