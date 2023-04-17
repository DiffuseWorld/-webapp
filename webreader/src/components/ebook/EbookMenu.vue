<script setup lang="ts">
import {ref,watchEffect} from 'vue'
import {useBook} from '@/stores'
import EbookSettingFont from './EbookSettingFont.vue';

type IProps={
    // isShow:boolean
};
const bookStore=useBook()

const showContent=(n:number)=>{
    console.log('当前是',n)
    if(n===bookStore.settingVisable){
        bookStore.settingVisable=-1
        return
    }
    bookStore.settingVisable=n
}

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