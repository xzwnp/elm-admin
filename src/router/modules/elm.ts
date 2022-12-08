import Layout from '@/layout/index.vue'
import {createNameComponent} from '../createNode'

const route = [
    {
        path: '/business',
        redirect: '/business/crud',
        component: Layout,
        meta: {title: '商家管理', icon: 'el-icon-document-copy'},
        alwayShow: true,
        children: [
            {
                path: 'business',
                component: createNameComponent(() => import('@/views/main/business/index.vue')),
                meta: {title: '商家管理', cache: true, roles: ['admin']}
            },
            {
                path: 'food',
                component: createNameComponent(() => import('@/views/main/business/food/food.vue')),
                meta: {title: '食物管理', cache: true, roles: ['admin']}
            }
        ]
    },
    {
        path: '/order',
        redirect: '/order/crud',
        component: Layout,
        meta: {title: '订单管理', icon: 'el-icon-document-copy'},
        alwayShow: true,
        children: [
            {
                path: '',
                component: createNameComponent(() => import('@/views/main/order/order.vue')),
                meta: {title: '订单管理', cache: true, roles: ['admin']}
            }
        ]
    }

]

export default route
