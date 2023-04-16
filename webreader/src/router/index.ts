import {createRouter,createWebHashHistory,type RouteRecordRaw} from 'vue-router'

const routes:RouteRecordRaw[]=[
    {
        path:'/',
        redirect:'/ebook'
    },{
        path:'/ebook',
        name:'/ebook',
        component:()=>import('@/views/ebook/index.vue'),
        children:[
            {
                path:':filename',//电子书名称以及目录
                component:()=>import('@/components/ebook/EbookReader.vue')
            }
        ]
    }
]

export default createRouter({
    history:createWebHashHistory(),
    routes
})
