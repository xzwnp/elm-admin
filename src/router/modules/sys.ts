//系统角色,用户,管理员管理
import Layout from '@/layout/index.vue'
import {createNameComponent} from '../createNode'

const route = [
    {
        path: '/sys',
        component: Layout,
        alwayShow: true,
        meta: {title: '系统管理', icon: 'el-icon-pie-chart', roles: 'super-admin'},
        children: [
            {
                meta: {title: '管理员管理', roles: 'super-admin'},
                component: createNameComponent(() => import('@/views/main/sys/adminUser/index.vue')),
                path: 'adminUser'
            },
            {
                meta: {title: '角色管理', roles: 'super-admin'},
                component: createNameComponent(() => import('@/views/main/sys/role/index.vue')),
                path: 'role'
            },
            {
                meta: {title: '用户管理', roles: 'super-admin'},
                component: createNameComponent(() => import('@/views/main/sys/normalUser/index.vue')),
                path: 'user'
            },
        ]
    }
]

export default route