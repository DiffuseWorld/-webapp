<script setup lang="ts">
import Bookmark from '@/components/common/Bookmark.vue'
import {ref,computed,watch, type StyleValue} from 'vue'
import {useBook} from '@/stores'
import {saveBookmark,getBookmark} from '@/utils'

const bookStore=useBook()
const BLUE = '#346cbc'
const WHITE = '#fff'

const height =35
const linjiezhi = 55
const bookmark=ref()
const text=ref('下拉收藏')
const color = ref(WHITE)
const iconDown = ref()
const isFiexed = ref(false)
const bookmarkList=ref<any[]>([])

const fixedStyle=():StyleValue=>{
    return {
        position:'fixed',
        top:0,
        right:`${(window.innerWidth-(<HTMLElement>bookmark.value).clientWidth)/2}`
    }
}

const offsetY=computed(()=>{
    return bookStore.offsetY
})

const isBookMask=computed(()=>{
    return bookStore.isBookMask
})

const addBookmark=()=>{
    bookmarkList.value=getBookmark(bookStore.filename)
    if(bookmarkList.value){
        bookmarkList.value=[]
    }
    const currentLocation = bookStore.currentbook?.rendition.currentLocation()
    // @ts-ignore
    const cfibase=currentLocation.start.cfi.replace(/!.*/,'')
    // @ts-ignore
    const cfistart=currentLocation.start.cfi.replace(/.*!/,'').replace(/\)$/,'')
    // @ts-ignore
    const cfiend = currentLocation.end.cfi.replace(/.*!/,'').replace(/\)$/,'')
    const cfirange=`${cfibase}!,${cfibase},${cfiend}`
    bookStore.currentbook?.getRange(cfirange).then(range=>{
        const text1=range.toString().replace(/\s\s/g,'')
        bookmarkList.value.push({
            // @ts-ignore
            cfi:currentLocation.start.cfi,
            text:text1
        })
        saveBookmark(bookStore.filename,bookmarkList.value)
    })
}

const removeBookmark=()=>{
    const currentLocation = bookStore.currentbook?.rendition.currentLocation()
    // @ts-ignore
    const cfi=currentLocation.start.cfi
    bookmarkList.value=getBookmark(bookStore.filename)
    if(bookmarkList.value){
        saveBookmark(bookStore.filename,bookmarkList.value.filter(i=>i.cfi!==cfi))
        bookStore.isBookMask=false
    }
}

watch([offsetY],(v)=>{
    if(!bookStore.bookAvailable || bookStore.isShow || bookStore.settingVisable>=0){
        return
    }
    if(v[0]>=height && v[0]<linjiezhi){
        // 状态2：未到临界值
        (bookmark.value as HTMLElement).style.top=`${-v}px`;
        if(bookStore.isBookMask){
            text.value='下拉取消收藏'
            color.value=BLUE
            isFiexed.value=false
        }else{
            text.value='下拉收藏'
            color.value=WHITE
            isFiexed.value=true
        }
        if((<HTMLElement>iconDown.value).style.transform === 'rotate(180deg)'){
            (<HTMLElement>iconDown.value).style.transform = 'rotate(0deg)'
        }
    } else if(v[0]>=linjiezhi){
        // 状态3：超过临界值
        (bookmark.value as HTMLElement).style.top=`${-v}px`
        if(bookStore.isBookMask){
            text.value='取消收藏成功'
            color.value=WHITE
            isFiexed.value=false
        }else{
            text.value='收藏成功'
            color.value=BLUE
            isFiexed.value=true
        }
        if((<HTMLElement>iconDown.value).style.transform === '' || (<HTMLElement>iconDown.value).style.transform==='rotate(0deg)'){
            (<HTMLElement>iconDown.value).style.transform = 'rotate(180deg)'
        }
        isFiexed.value=true
    }else if(v[0]>0 || v[0]<height){
        // 状态1
        if(bookStore.isBookMask){
            text.value='下拉取消收藏'
            color.value=BLUE
        }else{
            text.value='下拉收藏'
            color.value=WHITE
        }
        isFiexed.value=false
    } else if(v[0]===0){
        setTimeout(()=>{
            (<HTMLElement>bookmark.value).style.top=`${-height}px`;
            (<HTMLElement>bookmark.value).style.transform = `rotate(0deg)`
        },1000)
        if(isFiexed.value){
            bookStore.isBookMask=true
            addBookmark()
        }else{
            bookStore.isBookMask=false
            removeBookmark()
        }
    }
})

watch([isBookMask],(v)=>{
    isFiexed.value=(v[0] as boolean)
    if(v){
        color.value=BLUE
    }else{
        color.value=WHITE
    }
})
</script>

<template>
    <div class="ebook-bookmark" ref="backmark">
        <div class="ebook-bookmark-text-wrapper">
            <div class="ebook-bookmark-down-wrapper" ref="iconDown">
                <span class="icon-down"></span>
            </div>
            <div class="ebook-bookmark-text">{{ text }}</div>
        </div>
        <div class="ebook-bookmark-icon-wrapper" :style="isFiexed?fixedStyle():undefined">
            <Bookmark :color="color" :width="50" :height="35" ></Bookmark>
        </div>
    </div>
</template>

<style scoped lang="scss">
.ebook-bookmark{
    position: absolute;
    top: -100px;
    left: 0;
    right: 0;
    height: 100px;
    z-index: 200;
    background: #000;
    .ebook-bookmark-text-wrapper{
        position: absolute;
        display: flex;
        right: 45px;
        bottom: 0;
        .ebook-bookmark-down-wrapper{
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 14px;
            color: white;
            transition: all .2s linear;
        }
        .ebook-bookmark-text{
            font-size: 14px;
            color: white;
        }
    }
    .ebook-bookmark-icon-wrapper{
        position: absolute;
        right: 0;
        bottom: 0;
        margin-right: 20px;
        .icon{
            width: 0;
            height: 0;
            border-width: 10px 10px 10px 10px;
            border-style: solid;
            border-color: white white transparent white;
        }
    }
}
</style>