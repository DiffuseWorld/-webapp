import {ref} from 'vue'
import {defineStore} from 'pinia'
import type{Book} from 'epubjs'
import type { PackagingMetadataObject } from 'epubjs/types/packaging'

/**
 * 定义书籍相关的全局状态
 */
export const useBook = defineStore('book',()=>{
    let filename=ref('')
    let isShow=ref(false)
    let settingVisable=ref(-1)//-1：什么都不显示,0：设置字体大小,1：设置主题,2：设置进度条,3：设置目录
    let defauletFontsize=ref(12)
    let currentbook=ref<Book>()
    let defaultFontFamily=ref('Default')
    let fontFamilyVisable=ref(false)
    let defaultTheme=ref('Default')
    let bookAvailable=ref(false)
    let progress=ref(0)
    let section=ref(0) // 当前章节的位置
    let cover=ref('') // 阅读器侧边栏的小说的图片地址
    let metadata=ref<PackagingMetadataObject>() // 包含了书本信息，比如作者，书名
    return {
        filename,
        isShow,
        settingVisable,
        defauletFontsize,
        currentbook,
        defaultFontFamily,
        fontFamilyVisable,
        defaultTheme,
        bookAvailable,
        progress,
        section,
        cover,
        metadata
    }
})