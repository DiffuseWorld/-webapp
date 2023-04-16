<script setup lang="ts">
import {ref,watchEffect} from 'vue'
type IProps={
    isShow:boolean
};
const props=defineProps<IProps>()
const isShowSettingMenu=ref(false)

const toggleSettingMenu=()=>{
    isShowSettingMenu.value=!isShowSettingMenu.value
}
/**
 * 使用watchEffect可以监听prop，如果prop改变，那么可以执行一些副作用
 */
watchEffect(()=>{
    if(!props.isShow){
        isShowSettingMenu.value=false
    }
})
</script>

<template>
    <Transition name="slide-menu">
        <div class="menu-wrapper" v-show="isShow">
            <div class="menu-wrapper__icon-wrapper">
                <span class="icon-more icon"></span>
            </div>
            <div class="menu-wrapper__icon-wrapper">
                <span class="icon-progress icon"></span>
            </div>
            <div class="menu-wrapper__icon-wrapper">
                <span class="icon-bright icon"></span>
            </div>
            <div class="menu-wrapper__icon-wrapper">
                <span class="icon-A icon" @click="toggleSettingMenu"></span>
            </div>
        </div>
    </Transition>
    <Transition name="setting-menu">
        <div class="setting-wrapper" v-show="isShowSettingMenu">
            
        </div>
    </Transition>
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

    &.setting-menu-enter-to,&.setting-menu-leave-from{
        transform: translate3d(0,0,0)
    }
    &.setting-menu-enter-active,&.setting-menu-leave-active{
        transition: all .3s linear;
    }
    &.setting-menu-enter-from,&.setting-menu-leave-to{
        transform: translate3d(0,192px,0);
    }
 }
 .setting-wrapper{
    position: absolute;
    left: 0;
    right: 0;
    height: 100px;
    background-color: #fff;
    z-index: 102;
    box-shadow: 0 -8px 8px rgba(0,0,0,.15);
    bottom: 92px;

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
</style>