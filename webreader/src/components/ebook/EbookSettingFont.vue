<script lang="ts" setup>
import { useBook } from '@/stores'
import {ref} from 'vue'
import {fontSizes} from './canstains/font'
import {setFontSize} from '@/utils'
const bookStore = useBook()

const fontSizeList=ref(fontSizes)

const selectFont=(n:number)=>{
    bookStore.defauletFontsize=n
    setFontsize1()
}

const setFontsize1=()=>{
    bookStore.currentbook?.rendition.themes.fontSize(bookStore.defauletFontsize+'px')
    console.log(bookStore.filename)
    setFontSize(bookStore.filename,bookStore.defauletFontsize)
}
const showFontFamilyPopup = () =>{
    bookStore.fontFamilyVisable=true
}
</script>

<template>
    <Transition name="setting-menu">
        <div class="setting-wrapper" v-show="bookStore.isShow && bookStore.settingVisable === 0">
            <div class="setting-wrapper__setting-font">
                <div class="setting-wrapper__a">
                    a
                </div>
                <div class="setting-wrapper__center">
                    <div class="zhou-wrapper" v-for="(item,index) in fontSizeList">
                        <div class="line"></div>
                        <div class="center" @click="selectFont(item.fontSize)">
                            <div class="point" v-show="bookStore.defauletFontsize===item.fontSize">
                                <div class="point-small">
                                    
                                </div>
                            </div>
                        </div>
                        <div class="line"></div>
                    </div>
                </div>
                <div class="setting-wrapper__A">
                    A
                </div>
            </div>
            <div class="setting-font-family" @click="showFontFamilyPopup">
                <div class="setting-font-family-text-wrapper">
                    <span class="setting-font-family-text">
                        {{ bookStore.defaultFontFamily }}
                    </span>
                </div>
                <div class="setting-font-family-icon-wrapper">
                    <span class="icon-forward">

                    </span>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style lang="scss" scoped>
@import '@/assets/globalstyle/globalstyle.scss';

.setting-wrapper{
    display: flex;
    flex-direction: column;
}
.setting-wrapper__setting-font {
    flex: 2;
    width: 100%;
    display: flex;
    .setting-wrapper__a {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 0 0 60px;
    }

    .setting-wrapper__A {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 0 0 60px
    }

    .setting-wrapper__center {
        flex: 1;
        display: flex;
        align-items: center;

        .zhou-wrapper {
            flex: 1;
            display: flex;
            align-items: center;

            .line {
                flex: 1;
                height: 0;
                border-top: 1px solid #ccc;
            }

            .center {
                height: 30px;
                width: 0;
                flex: 0 0 0;
                border-left: 1px solid #ccc;
                position: relative;
                .point{
                    position: absolute;
                    top:-12px;
                    left: -30px;
                    width: 50px;
                    height: 50px;
                    border: 1px solid #ccc;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    &-small{
                        height: 30px;
                        width: 30px;
                        background: #000;
                        border-radius: 50%;
                    }
                }
            }

            &:first-child {
                 .line:first-child {
                    border-top: 1px solid #fff;
                }
            }

            &:last-child {
                .line:last-child {
                    border-top: 1px solid #fff;
                }
            }
        }

    }
}
.setting-font-family{
    flex:1;
    
    display: flex;
    justify-content: center;
    .setting-font-family-text-wrapper,.setting-font-family-icon-wrapper{
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 0 0 10px;
        margin-left: 10px;
        font-size: 13px;
    }
}
</style>