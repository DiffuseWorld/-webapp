<script setup lang="ts">
import {withDefaults,computed,ref,onMounted} from 'vue'
type IProps={
    width?:number
    color?:string
    height?:number
};

const bookmark = ref()
const props=withDefaults(defineProps<IProps>(),{

})
const style=computed(()=>{
    if(props.color && props.color.length>0){
        return {
            boderColor:`${props.color} ${props.color} transparent ${props.color}`
        }
    return ''
}})
const refresh=()=>{
    if(props.height && props.width){
        (bookmark.value as HTMLElement).style.borderWidth=`${props.height-5}px ${props.width/2}px 5px ${props.width/2}px`
    }
}
onMounted(()=>{
  refresh()
})
</script>

<template>
    <div class="book-mark" :style="style" ref="bookmark">

    </div>
</template>

<style lang="scss" scoped>
.book.mark{
    width: 0;
            height: 0;
            border-width: 10px 10px 10px 10px;
            border-style: solid;
            border-color: white white transparent white;
}
</style>