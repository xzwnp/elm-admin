import request from '@/utils/system/request'

// 登录api
export function loginApi(data: object) {
    return request({
        url: '/admin/login',
        method: 'post',
        data
    })
}

// 获取用户信息Api
export function getInfoApi(data: object) {
    return request({
        url: '/admin/info',
        method: 'get',
        data
    })
}

// 退出登录Api
export function loginOutApi() {
    return request({
        url: '/admin/out',
        method: 'delete',
    })
}

// 修改密码
export function passwordChange(data: object) {
    return request({
        url: '/admin/passwordChange',
        method: 'post',
        data
    })
}
