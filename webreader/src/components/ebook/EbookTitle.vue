<script setup lang="ts">
import { ref } from 'vue'
import {useRouter} from 'vue-router'
type IProps={
    isShow:boolean
}
const router=useRouter()

/**
 * 退出键
 */
const rego = () => {
    router.back()
}


const props=defineProps<IProps>()
</script>

<template>
    <Transition name="slide-title">
        <div class="title-wrapper" v-show="isShow">
            <div class="left" @click="rego">
                <div class="icon-back">
                    
                </div>
            </div>
            <div class="right">
                <div class="icon-wrapper">
                    <div class="icon-cart"></div>
                </div>
                <div class="icon-wrapper">
                    <div class="icon-person"></div>
                </div>
                <div class="icon-wrapper">
                    <div class="icon-move"></div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped lang="scss">
.title-wrapper {
    height: 100px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background-color: white;
    box-shadow: 0 8px 8px rgba(0, 0, 0, .15);
    display: flex;
    z-index: 102;
    .left {
        flex: 0 0 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 10px;

        .icon-back {
            font-size: 60px;
        }
    }
    .right {
        flex: 1;
        display: flex;
        justify-content: right;

        .icon-wrapper {
            flex: 0 0 100px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 60px;
        }
    }
    &.slide-title-enter-active,&.slide-title-leave-active{
        transition: all .3s linear;
    }
    &.slide-title-enter-from,&.slide-title-leave-to{
        transform: translate3d(0,-100%,0);
    }
    &.slide-title-enter-to,&.slide-title-leave-from{
        transform: translate3d(0,0,0);
    }

}</style>