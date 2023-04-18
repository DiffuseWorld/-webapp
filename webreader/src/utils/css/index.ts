import { useBook } from '@/stores'
export const addCss = (href: string) => {
    const link = document.createElement('link')
    const header = document.querySelector('head')
    link.setAttribute('rel', 'stylesheet')
    link.setAttribute('type', 'text/css')
    link.setAttribute('href', href)
    header?.appendChild(link)
}

export const initStyle = () => {
    const bookStore = useBook()
    console.log(bookStore.defaultTheme)
    switch (bookStore.defaultTheme) {
        case 'Default':
            addCss(`http://localhost:80/theme/theme_default.css`)
            break
        case 'Eye':
            addCss(`http://localhost:80/theme/theme_eye.css`)
            break
        case 'Gold':
            addCss(`http://localhost:80/theme/theme_gold.css`)
            break
        case 'Night':
            addCss(`http://localhost:80/theme/theme_night.css`)
            break
        default:
            addCss(`http://localhost:80/theme/theme_default.css`)
    }
}

export const removeCss=(href:string)=>{
    const link = document.querySelectorAll('link')
    link.forEach(i=>{
        if(i.getAttribute('href')&&i.getAttribute('href')===href){
            i.parentNode?.removeChild(i)
        }
    })
}

export const removeAll=()=>{
    removeCss(`http://localhost:80/theme/theme_default.css`)
    removeCss(`http://localhost:80/theme/theme_eye.css`)
    removeCss(`http://localhost:80/theme/theme_gold.css`)
    removeCss(`http://localhost:80/theme/theme_night.css`)
}

export const realPx=(px:number)=>{
    const Max=window.innerWidth>500?500:window.innerWidth
    return px*(Max/375)
}