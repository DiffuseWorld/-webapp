import {ref} from 'vue'
import {defineStore} from 'pinia'

/**
 * 定义书籍相关的全局状态
 */
export const useBook = defineStore('book',()=>{
    let filename=ref('')
    return {
        filename
    }
})