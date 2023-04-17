<script lang="ts" setup>
import {themeList} from './canstains/font'
import {ref} from 'vue'
import {useBook} from '@/stores'
import {setTheme,initStyle,removeAll} from '@/utils'
const themeListFuben=ref(themeList())
const bookStore=useBook()
type IItem={name:string;style:{body:{'color':string;'background':string}}}

const isSelected=(item:IItem)=>{
    return bookStore.defaultTheme===item.name
}
const xuanzhe=(item:IItem)=>{
    bookStore.defaultTheme=item.name
    selectTheme(item.name)
}
const isShow=()=>{
    console.log(bookStore.settingVisable===1)
    return bookStore.settingVisable===1
}
const selectTheme=(name:string)=>{
    bookStore.currentbook?.rendition.themes.select(name)
    setTheme(bookStore.filename,name)
    removeAll()
    initStyle()
}
</script>

<template>
    <Transition name="setting-menu">
        <div class="setting-wrapper" v-show="isShow()">
            <div class="setting-theme">
                <div class="setting-theme__item" v-for="(item,index) in themeListFuben" @click="xuanzhe(item)">
                    <div class="preview" :style="{background:item.style.body.background}" :class="{'no-border':item.name!=='Default'}">
                        
                    </div>
                    <div class="text" :class="{selected:isSelected(item)}">
                        {{ item.name }}
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style lang="scss" scoped>
@import '@/assets/globalstyle/globalstyle.scss';
.setting-theme{
    height: 100%;
    display: flex;
    &__item{
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 5px;
        box-sizing: border-box;
        .preview{
            flex: 1;
            border: 1px solid #ccc;
            box-sizing: border-box;
            &.no-border{
                border: none;
            }
        }
        .text{
            flex: 0 0 20px;
            font-size: 14px;
            color: #ccc;
            display: flex;
            justify-content: center;
            align-items: center;
            &.selected{
                color: #333;
            }
        }
    }
}
</style>