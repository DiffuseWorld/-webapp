import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useTestStore=defineStore('test',()=>{
    const testData = ref<string>('你知道我等你多久了吗')
    const index = ref(0)
    return {testData,index}
})