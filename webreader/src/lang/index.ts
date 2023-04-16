import {createI18n} from 'vue-i18n'
import cn from './cn'
import en from './en'
import {getLocale,setLocale} from '@/utils'

const messages = {
    cn,
    en
}
let locale=getLocale()
if(!locale){
    locale='cn'
    setLocale(locale)
}
export const v= createI18n({
    locale,
    messages
})

