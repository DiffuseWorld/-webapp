<script setup lang="ts">
import {ref,onUpdated,computed} from 'vue'
import {useBook} from '@/stores'
import {getReadTime} from '@/utils'
import {useRefreshLocation} from './hooks/refreshLocation'
const progresss=ref<HTMLElement>()
const bookstore=useBook()


/**
 * 获取章节名称的计算属性
 */
const sectionName=computed(()=>{
    if(bookstore.section){
        const sectionInfo=bookstore.currentbook?.section(bookstore.section)
        const sectionNM =bookstore.currentbook?.navigation.get((sectionInfo as any).href).label
        return sectionNM
    }
    return ''
})

const onProgressChange=()=>{
    const cfi=bookstore.currentbook?.locations.cfiFromPercentage(bookstore.progress/100)
    bookstore.currentbook?.rendition.display(cfi).then(()=>{
        refreshLocation()
    })
    updateProgressBg()
}
const onProgressInput=(progress:number)=>{
    bookstore.progress=progress
    updateProgressBg()
}
/**
 * 下一个章节
 */
const nextSection=()=>{
    if(bookstore.section < (bookstore.currentbook?.spine as any).length-1 && bookstore.bookAvailable){
        bookstore.section+=1
        tiaozhuan()
    }
}
/**
 * 前一个章节
 */
const preSection=()=>{
    if(bookstore.section>0&&bookstore.bookAvailable){
        bookstore.section-=1
        tiaozhuan()
    }
}
const tiaozhuan=()=>{
    const sectionInfo=bookstore.currentbook?.section(bookstore.section)
        if(sectionInfo && sectionInfo.href){
            bookstore.currentbook?.rendition.display(sectionInfo.href).then(()=>{
                refreshLocation()
            })
        }
}
const updateProgressBg=()=>{
    if(progresss.value){
        progresss.value.style.backgroundSize=`${bookstore.progress}% 100%`
    }
}
const refreshLocation=()=>{
    useRefreshLocation()
}
const getReadTimeText=()=>{
    return getReadTimeByMinute()
}
const getReadTimeByMinute=()=>{
    const readtime= getReadTime(bookstore.filename)
    if(!readtime){
        return 0
    }else{
        return Math.ceil(readtime/60)
    }
}
onUpdated(()=>{
    updateProgressBg()
})
</script>

<template>
    <Transition name="slide-up">
        <div class="setting-wrapper lll" v-show="bookstore.settingVisable===2">
            <div class="setting-progress">
                <div class="read-time-wrapper">
                    <span class="read-time-text">{{`已阅读${getReadTimeText()}分钟`}}</span>
                    <div class="icon-forward"></div>
                </div>
                <div class="progress-wrapper">
                    <div class="progress-icon-wrapper" @click="preSection()">
                        <div class="icon-back" ></div>
                    </div>
                    <input type="range" 
                    class="progress" 
                    max="100" 
                    min="0" 
                    ref="progresss"
                    step="1"
                    @change="onProgressChange()"
                    @input="e=>onProgressInput((e.target as any).value)"
                    :value="bookstore.progress"
                    :disabled="!bookstore.bookAvailable" />
                    <div class="progress-icon-wrapper" @click="nextSection()">
                        <div class="icon-forward" ></div>
                    </div>
                </div>
                <div class="text-wrapper">
                    <div class="progress-section-text">{{sectionName}}</div>
                    <span>({{ !bookstore.bookAvailable?'加载中':bookstore.progress+'%' }})</span>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style lang="scss" scoped>
@import '@/assets/globalstyle/globalstyle.scss';
.lll{
    height: 120px;
}
.setting-progress {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 101;
    .read-time-wrapper{
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
    }
    .progress-wrapper {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 30px;
        width: 100%;
        height: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 15px;
        box-sizing: border-box;
        .progress-icon-wrapper{
            font-size: 20px;
        }
        .progress {
            width: 100%;
            -webkit-appearance: none; // 禁用按钮的样式
            height: 2px;
            // background: -webkit-linear-gradient(#999, #999) no-repeat, #ddd;
            // background-size: 0 100% !important;
            margin: 0 10px;
            &:focus {
                outline: none;
            }

            &::-webkit-slider-thumb {
                -webkit-appearance: none;
                height: 20px;
                width: 20px;
                border-radius: 50%;
                background-color: white;
                box-shadow: 0 4px 4px rgba(0, 0, 0, .15);
                border: 1px solid #ddd;
            }
        }
        
    }
    .text-wrapper {
        position: absolute;
        left: 0;
        bottom: 10px;
        right: 0;
        text-align: center;
        font-size: 12px;
        color: #333;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 15px;
        box-sizing: border-box;
        .progress-section-text{
            text-overflow: ellipsis;// 当文本超出的时候按省略号表示
            overflow: hidden;
            white-space: nowrap;// 文本不换行
        }
    }
}</style>