import {ref} from 'vue'
import {defineStore} from 'pinia'
import type{Book} from 'epubjs'

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
    return {
        filename,
        isShow,
        settingVisable,
        defauletFontsize,
        currentbook,
        defaultFontFamily,
        fontFamilyVisable
    }
})