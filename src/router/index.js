import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import signup from '../views/signup.vue'

const routes = [
	{ path: '/', name: 'Home', component: () => import('../views/login.vue') },
	{ path: '/search', name: 'Search', component: () => import('../views/search.vue') },
	{
		path: '/signup',
		name: 'signup',
		component: signup,
	},
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
})

export default router
