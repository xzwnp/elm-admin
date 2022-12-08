import request from '@/utils/system/request'

// 获取数据api
export function getData(data: object) {
    return request({
        url: 'user/admin/page',
        method: 'post',
        data
    })
}

// 获取分类数据
export function getCategory(data: object) {
    return request({
        url: 'user/admin/page',
        method: 'post',
        data
    })
}

// 获取树组织数据
export function getTree(data: object) {
    return request({
        url: 'user/admin/tree',
        method: 'post',
        data
    })
}

// 新增
export function add(data: object) {
    return request({
        url: 'user/admin',
        method: 'post',

        data
    })
}

// 编辑
export function update(data: object) {
    return request({
        url: 'user/admin',
        method: 'put',
        data
    })
}

// 删除
export function del(data:  number[]) {
    console.log(data)
    return request({
        url: 'user/admin',
        method: 'DELETE',
        data
    })
}
