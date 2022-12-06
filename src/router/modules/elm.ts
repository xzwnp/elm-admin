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
                path: 'crud',
                component: createNameComponent(() => import('@/views/main/business/index.vue')),
                meta: {title: '商家管理', cache: true, roles: ['admin']}
            }
        ]
    }
]

export default route
