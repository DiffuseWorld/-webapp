<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { onMounted, getCurrentInstance, type ComponentInternalInstance, ref } from 'vue'
import epubjs, { Book, Rendition } from 'epubjs'
import { useBook } from '@/stores'
import EbookMenu from './EbookMenu.vue'
import EbookTitle from './EbookTitle.vue'
import EbookSettingFontPopup from './EbookSettingFontPopup.vue'
import { setFontFamily, getFontFamily, getFontSize, setFontSize,getTheme,setTheme,initStyle } from '@/utils'
import EbookSettingThemes from './EbookSettingThemes.vue'
import {themeList} from './canstains/font'
import {removeAll} from '@/utils'
import EbookSettingProgress from './EbookSettingProgress.vue'
import {useRefreshLocation,useGetLocationHistory,useFlatten} from './hooks/refreshLocation'
import EbookSlide from './EbookSlide.vue'
import type { PackagingMetadataObject } from 'epubjs/types/packaging'

const route = useRoute()
const bookStore = useBook()
const book = ref<Book>()
const renditon = ref<Rendition>()
const touchObj = {
    touchStartX: 0,
    timestamp: 0
}


/**
 * epub电子书的阅读器
 */
onMounted(() => {
    init()
})
const init = () => {
    // 存储到上下文中
    // (getCurrentInstance() as ComponentInternalInstance).appContext.config.globalProperties.$epubjs = epubjs
    const hosturl = 'http://localhost:80'
    // 获取nginx静态资源目录
    const filename = (route.params['filename'] as string).split('|').join('/')
    // 存储完整路径到全局状态中
    bookStore.filename = `${hosturl}/${filename}.epub`
    initEpub()
}
/**
 * 初始话epub
 */
const initEpub = () => {
    book.value = epubjs(bookStore.filename)
    bookStore.currentbook = book.value
    // 挂载元素
    renditon.value = book.value.renderTo('read', {
        width: innerWidth,
        height: innerHeight,
        // medth:'default'
    })
    // 开始渲染
    renditon.value.display().then(() => {
        let fontfamily = getFontFamily(bookStore.filename)
        if (!fontfamily) {
            setFontFamily(bookStore.filename, bookStore.defaultFontFamily)
        } else {
            bookStore.defaultFontFamily = fontfamily
            bookStore.currentbook?.rendition.themes.font(fontfamily)
        }
        let fontSzie = getFontSize(bookStore.filename)
        if(!fontSzie){
            setFontSize(bookStore.filename,bookStore.defauletFontsize)
        }else{
            bookStore.defauletFontsize=getFontSize(bookStore.filename)
            bookStore.currentbook?.rendition.themes.fontSize(fontSzie+'px')
        }
        initTheme() // 必须在getTheme前执行，不然的话无法访问到对应的主题
        
        let theme=getTheme(bookStore.filename)
        if(!theme){
            setTheme(bookStore.filename,bookStore.defaultTheme)
        }else{
            bookStore.defaultTheme=theme
            bookStore.currentbook?.rendition.themes.select(theme)
        }
        removeAll()
        initStyle()
        initBookProgress()
    })
    // 监听开始触摸的事件，主要记录x坐标值和时间戳
    renditon.value.on('touchstart', (e: any) => {
        touchObj.touchStartX = e.changedTouches[0].clientX
        touchObj.timestamp = e.timeStamp
    })
    // 监听结束触摸的事件，通过计算偏移值和时间偏移值来判断操作，停留的时间太长则不予切换页面,
    renditon.value.on('touchend', (e: any) => {
        const offset = e.changedTouches[0].clientX - touchObj.touchStartX
        const timeoffset = e.timeStamp - touchObj.timestamp
        console.log(offset, timeoffset)
        if (timeoffset < 500 && offset > 40) {
            prePage()
        } else if (timeoffset < 500 && offset < -40) {
            nextPgae()
        } else {
            console.log('我被执行了')
            toggleTitleAndMenu()
        }
        bookStore.currentbook?.rendition.hooks.content.register((centents: any) => {
            Promise.all([
                centents.addStylesheet('http://localhost:80/font/daysOne.css'),
                centents.addStylesheet('http://localhost:80/font/cabin.css'),
                centents.addStylesheet('http://localhost:80/font/montserrat.css'),
                centents.addStylesheet('http://localhost:80/font/tangerine.css')
            ]).then(() => {
                console.log('字体全部加载完毕')
            }).catch(e => {
                console.log('加载出错，请检查网络')
            })
        })
        
        // e.preventDefault()
        e.stopPropagation()
    })
}
const prePage = () => {
    renditon.value?.prev()
    hiddenTitleAndMenu()
}
const nextPgae = () => {
    renditon.value?.next()
    hiddenTitleAndMenu()
}
const toggleTitleAndMenu = () => {
    bookStore.isShow = !bookStore.isShow
    reSetting()
}
const hiddenTitleAndMenu = () => {
    bookStore.isShow = false
    reSetting()
}
const reSetting = () => {
    bookStore.settingVisable = -1
    bookStore.fontFamilyVisable = false
}
const initTheme=()=>{
    themeList().forEach(i=>{
        bookStore.currentbook?.rendition.themes.register(i.name,i.style)
    })
    bookStore.currentbook?.rendition.themes.select(bookStore.defaultTheme)
}
const initBookProgress=()=>{
    bookStore.currentbook?.ready.then(()=>{
        return bookStore.currentbook?.locations.generate(750*(window.innerWidth/375)*(bookStore.defauletFontsize/16))//根据指定算法分页
    }).then((locations)=>{
        bookStore.bookAvailable=true
        useGetLocationHistory() // 注意，必须要等到epub分页完成后才可以设置进度条
        parseBook()
    })
}
const parseBook=()=>{
    bookStore.currentbook?.loaded.cover.then((cover:any)=>{
        bookStore.currentbook?.archive.createUrl(cover,{base64:true}).then((url)=>{
            bookStore.cover=url
            console.log(bookStore.cover)
        })
        bookStore.currentbook?.loaded.metadata.then((metadata:PackagingMetadataObject)=>{
            bookStore.metadata=metadata
        })
        // 获取电子书的目录以及目录层级
        bookStore.currentbook?.loaded.navigation.then(({toc}:any)=>{
            // 数组扁平化，更好操作数据
            let navigation = useFlatten(toc)
            // 获取目录级别，比如说一级目录或者二级目录
            const find=(item:any,lava:number=0):number=>{
                if(!item.parent){
                    return lava
                }else{
                    return find(navigation.filter(preitem=>preitem.parent===item.id),++lava)
                }
            }
            navigation.forEach(i=>{
                i.lava=find(i)
            })
        })
    })
}
</script>

<template>
    <EbookTitle />
    <div class="ebook-reader">
        <div id="read">
        </div>
    </div>
    <EbookMenu />
    <EbookSettingFontPopup />
    <EbookSettingThemes/>
    <EbookSettingProgress/>
    <EbookSlide/>
</template>

<style scoped lang="scss">
.ebook-reader {
    height: 100%;
    width: 100%;
}

#read {
    font-family: 'Days One';
}
</style>