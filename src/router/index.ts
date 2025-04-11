import {createRouter, createWebHistory} from 'vue-router';

export default createRouter({
    // 路由的模式的设置
    history: createWebHistory(),
    routes: [
        {
            path: '/home',
            component: () => import('@/pages/home/index.vue')
        },
        {
            path: '/user',
            component: () => import('@/pages/user/index.vue'),
            children: [
                {
                    path:'verification',
                    component: () => import('@/pages/user/verification/index.vue'),
                },
                {
                    path:'account',
                    component: () => import('@/pages/user/account/index.vue'),
                },
                {
                    path:'order',
                    component: () => import('@/pages/user/order/index.vue'),
                },
                {
                    path:'patient',
                    component: () => import('@/pages/user/patient/index.vue'),
                },
                {
                    path:'feedback',
                    component: () => import('@/pages/user/feedback/index.vue'),
                }
            ]
        },
        {
            path: '/hospital',
            component: () => import('@/pages/hospital/index.vue'),
            children: [
                {
                    path:'register',
                    component: () => import('@/pages/hospital/register/index.vue'),
                },
                {
                    path:'detail',
                    component: () => import('@/pages/hospital/detail/index.vue'),
                },
                {
                    path:'notice',
                    component: () => import('@/pages/hospital/notice/index.vue'),
                },
                {
                    path:'search',
                    component: () => import('@/pages/hospital/search/index.vue'),
                },
                {
                    path:'close',
                    component: () => import('@/pages/hospital/close/index.vue'),
                },
                {
                    path:'register_step1',
                    component: () => import('@/pages/hospital/register/register_step1.vue'),
                },
                {
                    path:'register_step2',
                    component: () => import('@/pages/hospital/register/register_step2.vue'),
                }
            ]
        },
        {
            path: '/',
            redirect: '/home'
        }
    ],
    // 滚动行为配置
    scrollBehavior() {
        return {
            left: 0,
            top: 0
        }
    }
})