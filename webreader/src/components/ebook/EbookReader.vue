<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { onMounted, getCurrentInstance, type ComponentInternalInstance,ref } from 'vue'
import epubjs,{Book,Rendition} from 'epubjs'
import { useBook } from '@/stores/index'
import EbookMenu from './EbookMenu.vue'
import EbookTitle from './EbookTitle.vue'

const route = useRoute()
const bookStore = useBook()
const book = ref<Book>()
const renditon=ref<Rendition>()
const touchObj = {
    touchStartX:0,
    timestamp:0
}
const isShow =ref(false)

/**
 * epub电子书的阅读器
 */
onMounted(() => {
    init()
})
const init = () => {
    // 存储到上下文中
    (getCurrentInstance() as ComponentInternalInstance).appContext.config.globalProperties.$epubjs = epubjs
    const hosturl = 'http://localhost:80'
    // 获取nginx静态资源目录
    const filename = (route.params['filename'] as string).split('|').join('/')
    // 存储完整路径到全局状态中
    bookStore.filename = `${hosturl}/${filename}.epub`
    initEpub()
}
/**
 * 初始话epub
 */
const initEpub = () =>{
    book.value=epubjs(bookStore.filename)
    // 挂载元素
    renditon.value=book.value.renderTo('read',{
        width:innerWidth,
        height:innerHeight,
        // medth:'default'
    })
    // 开始渲染
    renditon.value.display()
    // 监听开始触摸的事件，主要记录x坐标值和时间戳
    renditon.value.on('touchstart',(e:any)=>{
        touchObj.touchStartX = e.changedTouches[0].clientX
        touchObj.timestamp = e.timeStamp
    })
    // 监听结束触摸的事件，通过计算偏移值和时间偏移值来判断操作，停留的时间太长则不予切换页面,
    renditon.value.on('touchend',(e:any)=>{  
        const offset  = e.changedTouches[0].clientX - touchObj.touchStartX
        const timeoffset = e.timeStamp-touchObj.timestamp
        console.log(offset,timeoffset)
        if(timeoffset<500 && offset>40){
            prePage()
        }else if(timeoffset<500 && offset<-40){
            nextPgae()
        }else{
            console.log('我被执行了')
            toggleTitleAndMenu()
        }
        // e.preventDefault()
        e.stopPropagation()
    })
}
const prePage=()=>{
    renditon.value?.prev()
}
const nextPgae = () =>{
    renditon.value?.next()
}
const toggleTitleAndMenu = ()=>{
    isShow.value=!isShow.value
}
</script>

<template>
    <EbookTitle :is-show="isShow"/>
    <div class="ebook-reader">
        <div id="read">
        </div>
    </div>
    <EbookMenu :is-show="isShow"/>
</template>

<style scoped lang="scss">
.ebook-reader{
    height: 100%;
    width: 100%;
}
</style>