<script setup lang="ts">
import { useBook } from '@/stores'
import {ref,onMounted} from 'vue'
import {FONT_FAMILY} from './canstains/font'
import {setFontFamily} from '@/utils'

const bookStore = useBook()
const fontFamilyList=ref(FONT_FAMILY)




const hide = () => {
    bookStore.fontFamilyVisable = false
}
const showSelector=(item:{font:string})=>{
    return bookStore.defaultFontFamily===item.font
}
const toggleDefault=(item:{font:string})=>{
    bookStore.defaultFontFamily=item.font
    setFontFamily(bookStore.filename,bookStore.defaultFontFamily)
    let fontFamliy
    if(item.font==='Default'){
        fontFamliy='Times New Roman'
    }else{
        fontFamliy=item.font
    }
    bookStore.currentbook?.rendition.themes.font(fontFamliy)
}
onMounted(()=>{
    
})
</script>

<template>
    <Transition name="popup-slide-up">
        <div class="ebook-popup-list" v-show="bookStore.fontFamilyVisable">
            <div class="ebook-popup-title">
                <div class="ebook-popup-title-icon" @click="hide">
                    <span class="icon-down2"></span>
                </div>
                <span class="ebook-popup-title-text">{{$t('book.selectFont')}}</span>
            </div>
            <div class="ebook-popup-list__wrapper">
                <div class="ebook-popup-item" v-for="(item,index) in fontFamilyList" :key="index" @click="toggleDefault(item)">
                    <div class="ebook-popup-iten-text" :class="{'selected':showSelector(item)}">{{ item.font }}</div>
                    <div class="ebook-popup-item-check" :class="{'selected':showSelector(item)}" v-show="showSelector(item)">
                        <span class="icon-check"></span>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style lang="scss" scoped>
.ebook-popup-list {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 300;
    background-color: white;
    box-shadow: 0 -4px 6px rgba(0, 0, 0, .1);

    .ebook-popup-title {
        position: relative;
        padding: 15px;
        box-sizing: border-box;
        border-bottom: 1px solid #b8b9bb;
        text-align: center;

        .ebook-popup-title-icon {
            position: absolute;
            left: 15px;
            top: 0;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 16px;
            font-weight: bold;
        }

        &-text {
            font-size: 14px;
            font-weight: bold;
        }
    }

    .ebook-popup-list__wrapper {
        .ebook-popup-item{
            display: flex;
            padding: 15px;
            .ebook-popup-iten-text{
                flex: 1;
                font-size: 14px;
                text-align: left;
                &.selected{
                    color: blue;
                    font-weight: bold;
                }
            }
            .ebook-popup-item-check{
                flex: 1;
                text-align: right;
                font-size: 14px;
                &.selected{
                    color: blue;
                }
            }
        }
    }
}
.popup-slide-up-enter-from,.popup-slide-up-leave-to{
    transform: translate3d(0,100%,0);
    opacity: 0;
}
.popup-slide-up-enter-to,.popup-slide-up-leave-from{
    transform: translate3d(0,0,0);
    opacity: 1;
}
.popup-slide-up-enter-active,.popup-slide-up-leave-active{
    transition: all .2s linear;
}
</style>