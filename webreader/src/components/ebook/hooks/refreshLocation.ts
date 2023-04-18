import {useBook} from '@/stores'
import {saveLocation,getLocation,getReadTime} from '@/utils'

/**
 * 持久化进度条的数据的hook
 */
export const useRefreshLocation=()=>{
    const bookstore = useBook()
    const currentLocation=bookstore.currentbook?.rendition.currentLocation()
    const progressval=bookstore.currentbook?.locations.percentageFromCfi(( currentLocation as any ).start.cfi)
    bookstore.progress=Math.floor((progressval as number)*100)
     // 用来持久化进度条的数据
    const startCfi=(currentLocation as any).start.cfi
    saveLocation(bookstore.filename,startCfi)
    bookstore.isShow=false
    bookstore.settingVisable=-1
}

/**
 * 获取持久化的数据
 */
export const useGetLocationHistory=()=>{
    const bookStore=useBook()
    const cfi=getLocation(bookStore.filename)
    if(cfi){
        const progressval = bookStore.currentbook?.locations.percentageFromCfi(cfi)
        bookStore.progress=Math.floor((progressval as number)*100)
        bookStore.currentbook?.rendition.display(progressval).then(()=>{
            // 注意，必须要页面跳转后才能获取章节信息
            const currentLocation = bookStore.currentbook?.rendition.currentLocation()
            bookStore.section=(currentLocation as any).start.index
        })
    }
}

/**
 * 侧边目录隐藏的hook
 */
export const useHideSlide=()=>{
    const bookStore=useBook()
    bookStore.isShow=false
    bookStore.settingVisable=-1
    bookStore.fontFamilyVisable=false
}


/**
 * 获取阅读时间的文本
 * @returns 
 */
export const useGetReadTimeText=()=>{
    const bookStore= useBook()
    let readtime=getReadTime(bookStore.filename)
    console.log(readtime)
    if(!readtime){
        return 0+'分钟'
    }else{
        return Math.ceil(Math.ceil(readtime))/60+'分钟'
    }
}

/**
 * 多层嵌套数组扁平化
 * @param arrs 
 */
export const useFlatten=(arrs:any[]):any[]=>{
    return [].concat(...arrs.map(i=>[].concat(i,...useFlatten(i.subitems) as any[])))
}

