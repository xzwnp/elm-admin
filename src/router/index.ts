/**
 * @description 所有人可使用的参数配置列表
 * @params hideMenu: 是否隐藏当前路由结点不在导航中展示
 * @params alwayShow: 只有一个子路由时是否总是展示菜单，默认false
 */
import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'
import store from '@/store'
import NProgress from '@/utils/system/nprogress'
import {changeTitle} from '@/utils/system/title'

// 动态路由相关引入数据
import Layout from '@/layout/index.vue'
import MenuBox from '@/components/menu/index.vue'
import {createNameComponent} from './createNode'

// 引入modules
import Dashboard from './modules/dashboard'
import Pages from './modules/pages'
import System from './modules/system'
import elm from './modules/elm'
import sys from './modules/sys'
import role from "@/views/main/sys/role/index.vue";


let modules: object[] = [
    ...System,

]

const routes: any = modules

const router = createRouter({
    history: createWebHashHistory(),
    routes
})
//如果使用静态路由,新增页面在这里导入
let asyncRoutes: RouteRecordRaw[] = [
    ...Dashboard,
    // ...Pages,
    ...elm,
    ...sys,
]

// 动态路由的权限新增，供登录后调用
export function addRoutes() {


    asyncRoutes.forEach(item => {
        modules.push(item)
        router.addRoute(item)
    })
}

// 重置匹配所有路由的解决方案，todo
function eachData(data: any, type: number) {
    // @ts-ignore
    data.forEach(d => {
        if (d.children && d.children.length > 0) {
            if (type === 0) {
                d.component = Layout
            } else {
                d.component = createNameComponent(MenuBox)
            }
            eachData(d.children, type + 1)
        } else {
            /* 暂时写死，todo项 */
            d.component = createNameComponent(() => import('@/views/main/pages/crudTable/index.vue'))
        }
    })
}

// @ts-ignore
if (store.state.user.token) {
    addRoutes()
}

const whiteList = ['/login']

router.beforeEach((to, _from, next) => {
    NProgress.start();
    // @ts-ignore
    if (store.state.user.token || whiteList.indexOf(to.path) !== -1) {
        to.meta.title ? (changeTitle(to.meta.title)) : ""; // 动态title
        next()
    } else {
        next("/login"); // 全部重定向到登录页
        to.meta.title ? (changeTitle(to.meta.title)) : ""; // 动态title
    }
});

router.afterEach((to, _from) => {
    const keepAliveComponentsName = store.getters['keepAlive/keepAliveComponentsName'] || []
    // @ts-ignore
    const name = to.matched[to.matched.length - 1].components.default.name
    if (to.meta && to.meta.cache && name && !keepAliveComponentsName.includes(name)) {
        store.commit('keepAlive/addKeepAliveComponentsName', name)
    }
    NProgress.done();
});

export {
    modules
}

export default router
