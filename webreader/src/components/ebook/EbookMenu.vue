<script setup lang="ts">
import {ref,watchEffect} from 'vue'
import {useBook} from '@/stores'
import EbookSettingFont from './EbookSettingFont.vue';

type IProps={
    // isShow:boolean
};
const bookStore=useBook()

const showContent=(n:number)=>{
    if(n===bookStore.settingVisable){
        bookStore.settingVisable=-1
        return
    }
    bookStore.settingVisable=n
}

/* const toggleSettingMenu=()=>{
    isShowSettingMenu.value=!isShowSettingMenu.value
} */

/* const showContent=(n:number)=>{
    settingIndex.value=n
    // 当设置栏打开时，只切换设置栏的内容，不关闭设置栏
    if(isShowSettingMenu.value){
        return
    }
    toggleSettingMenu()
} */
/**
 * 使用watchEffect可以监听state，如果state改变，那么可以执行一些副作用
 */
/* watchEffect(()=>{
    if(!bookStore.isShow){
        // 关闭上下栏的时候，顺便关闭设置栏
        isShowSettingMenu.value=false
    }
}) */
</script>

<template>
    <Transition name="slide-menu">
        <div class="menu-wrapper" v-show="bookStore.isShow" :class="{'hide-shadow':bookStore.settingVisable!==-1}">
            <div class="menu-wrapper__icon-wrapper" @click="showContent(3)">
                <span class="icon-more icon"></span>
            </div>
            <div class="menu-wrapper__icon-wrapper" @click="showContent(2)">
                <span class="icon-progress icon"></span>
            </div>
            <div class="menu-wrapper__icon-wrapper" @click="showContent(1)">
                <span class="icon-bright icon"></span>
            </div>
            <div class="menu-wrapper__icon-wrapper" @click="showContent(0)">
                <span class="icon-A icon"></span>
            </div>
        </div>
    </Transition>
    <EbookSettingFont/>
</template>

<style lang="scss" scoped>
 .menu-wrapper{
    height: 100px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: white;
    box-shadow: 0 -8px 8px rgba(0,0,0,.15);
    display: flex;
    z-index: 102;
    &__icon-wrapper{
        flex:1;
        display: flex;
        justify-content: center;
        align-items: center;
        .icon{
            font-size: 50px;
        }
    }

   

    &.slide-menu-enter-to,&.slide-menu-leave-from{
        transform: translate3d(0,0,0)
    }
    &.slide-menu-enter-active,&.slide-menu-leave-active{
        transition: all .3s linear;
    }
    &.slide-menu-enter-from,&.slide-menu-leave-to{
        transform: translate3d(0,192px,0);
    }
 }
 .hide-shadow{
    box-shadow: none;
 }
</style>