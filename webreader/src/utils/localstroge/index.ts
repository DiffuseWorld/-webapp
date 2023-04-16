import Storage from 'web-storage-cache'
const localstorage=new Storage()

export const setLocalstorage=(key:string,value:any)=>{
    return localstorage.set(key,value)
}

export const getLocalstorage=(key:string)=>{
    return localstorage.get(key)
}

export const deleteLocalstorage=(key:string)=>{
    return localstorage.delete(key)
}

export const removeAllLocalstorage=()=>{
    return localstorage.clear()
}

export const setBookObject=(filename:string,key:string,value:any)=>{
    let book = getLocalstorage(`${filename}-info`)
    if(!book){
        book={}
    }
    book[key]=value
    setLocalstorage(`${filename}-info`,book)
}

export const getBookObject = (filename:string,key:string) =>{
    let book = getLocalstorage(`${filename}-info`)
    if(book){
        return book[key]
    }else{
        return null
    }
}

export const getFontFamily = (filename:string)=>{
    return getBookObject(filename,'fontFamily')
}

export const setFontFamily = (filename:string,font:string) => {
    return setBookObject(filename,'fontFamily',font)
}

export const setFontSize=(filename:string,fontsize:number)=>{
    return setBookObject(filename,'fontSize',fontsize)
}

export const getFontSize=(filename:string)=>{
    return getBookObject(filename,'fontSize')
}

export const setLocale=(locale:string)=>{
    return setLocalstorage('locale',locale)
}

export const getLocale=()=>{
    return getLocalstorage('locale')
}