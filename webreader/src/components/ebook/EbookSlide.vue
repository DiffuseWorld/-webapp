<script lang="ts" setup>
import {useBook} from '@/stores'
import {useHideSlide} from './hooks/refreshLocation'
import {ref} from 'vue'
import EbookSlideContent from './EbookSlideContent.vue'
import EbookLoading from './EbookLoading.vue'

const bookStore = useBook()
const currentTab=ref(1)

const hide=()=>{
    useHideSlide()
}
/**
 * tab栏切换
 * @param n 
 */
const toggleTab=(n:number)=>{
    currentTab.value=n
}
</script>

<template>
    <Transition name="fade-slide-right">
        <div class="silde-content-wrapper" v-show="bookStore.isShow && bookStore.settingVisable === 3">
        <div class="content" v-if="bookStore.settingVisable===3">
            <div class="centent-page-wrapper" v-if="bookStore.bookAvailable">
                <div class="content-page">
                    <component :is="EbookSlideContent"></component>
                </div>
                <div class="content-page-tab">
                    <div class="content-page-tab-item" 
                    :class="{'selected':currentTab===1}"
                    @click="toggleTab(1)">
                        目录
                    </div>
                    <div class="content-page-tab-item" 
                    :class="{'selected':currentTab===2}"
                    @click="toggleTab(2)">
                        书签
                    </div>
                </div>
            </div>
            <div class="content-empty" v-else>
                <!-- 加载动画组件 -->
                <EbookLoading/> 
            </div>
        </div>
        <div class="content-bg" @click.prev="hide()"></div>
    </div>
    </Transition>
</template>

<style lang="scss" scoped>
@import '@/assets/globalstyle/globalstyle.scss';
.silde-content-wrapper{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 300;
    width: 100%;
    height: 100%;
    display: flex;
    background-color: rgba(0,0,0,.3);
    .content{// 也许看到这里的人会觉得一脸懵逼，明明没设置背景却有了背景颜色，其实一切都要归功于前面的nginx的样式请求
        flex: 0 0 85%;
        width: 85%;
        height: 100%;
        .centent-page-wrapper{
            display: flex;
            height: 100%;
            width: 100%;
            flex-direction: column;
            .content-page{
                flex: 1;
                width: 100%;
                overflow: hidden;
            }
            .content-page-tab{
                flex:0 0 48px;
                width: 100%;
                height: 48px;
                display: flex;
                .content-page-tab-item{
                    flex: 1;
                    font-size: 12px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            }
        }
        .content-empty{
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
    .content-bg{
        flex:0 0 15%;
        width: 15%;
        height: 100%;
    }
}
</style>