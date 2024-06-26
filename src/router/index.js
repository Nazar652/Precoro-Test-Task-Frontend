import {createRouter, createWebHistory} from 'vue-router'
import IndexView from '../views/IndexView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'index',
            component: IndexView
        },
        {
            path: '/sign-up',
            name: 'sign-up',
            component: () => import('../views/SignUpView.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/LoginView.vue')
        },
        {
            path: '/cart',
            name: 'cart',
            component: () => import('../views/CartView.vue')
        },
        {
            path: '/orders',
            name: 'orders',
            component: () => import('../views/OrdersView.vue')
        },
        {
            path: '/category/:id',
            name: 'category',
            props: true,
            component: () => import('../views/CategoryView.vue')
        },
        {
            path: '/product/:id',
            name: 'product',
            props: true,
            component: () => import('../views/ProductView.vue')
        },
        {
            path: '/wishlist',
            name: 'wishlist',
            component: () => import('../views/WishListView.vue')
        },
        {
            path: '/:pathMatch(.*)*',
            redirect: '/not-found',
        },
        {
            path: '/not-found',
            name: 'notFound',
            component: () => import('../views/NotFoundView.vue')
        },
    ]
})

export default router
