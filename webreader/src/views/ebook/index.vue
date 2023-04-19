<script lang="ts" setup>
import {getReadTime,saveReadTime} from '@/utils'
import {useBook} from '@/stores'
import {ref,onBeforeUnmount,onMounted,watch,computed} from 'vue'
import EbookBookMark from '@/components/ebook/EbookBookMark.vue'
const bookStore=useBook()
const intervalDel=ref()
const ebook=ref<HTMLElement>()

/**
 * 创建定时任务，记录阅读时间
 */
const startLoopReadTime=()=>{
    let readTime = getReadTime(bookStore.filename)
    if(!readTime){
        readTime=0
    }
    intervalDel.value=setInterval(()=>{
        readTime+=1
        if(readTime%30===0){
            saveReadTime(bookStore.filename,readTime)
        }
    },1000)
}
onMounted(()=>{
    startLoopReadTime()
})
onBeforeUnmount(()=>{
    clearInterval(intervalDel.value)
})
// 不能直接通过watch监听pinia那么可以用计算属性做中间转换
const offset=computed(()=>{
    return bookStore.offsetY
})
watch([offset],(v)=>{
    if (!bookStore.isShow && bookStore.bookAvailable) {
        if (v[0] > 0) {
            (ebook.value as HTMLElement).style.top = `${bookStore.offsetY}px`;
        } else {
            (ebook.value as HTMLElement).style.top = 0 + '';
            (ebook.value as HTMLElement).style.transition = `all .2s linear`
            setTimeout(() => {
                (ebook.value as HTMLElement).style.transition = ''
            }, 200)
        }
    }
})
</script>


<template>
    <div class="ebook" ref="ebook">
        <RouterView></RouterView>
        <EbookBookMark/>
    </div>
</template>

<style scoped lang="scss">
    #app{
        height: 100%;
        width: 100px;
        overflow: hidden;
    }
    .ebook{
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
    }
</style>