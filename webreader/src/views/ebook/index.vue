<script lang="ts" setup>
import {getReadTime,saveReadTime} from '@/utils'
import {useBook} from '@/stores'
import {ref,onBeforeUnmount,onMounted} from 'vue'

const bookStore=useBook()
const intervalDel=ref()

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
</script>


<template>
<RouterView></RouterView>
</template>

<style scoped lang="scss">
    #app{
        height: 100%;
        width: 100px;
        overflow: hidden;
    }

</style>