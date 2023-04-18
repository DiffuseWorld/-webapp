<script lang="ts" setup>
    import {defineProps,withDefaults,defineEmits,ref,onMounted} from 'vue'
    import {realPx} from '@/utils'

    const scrollWrapper=ref<HTMLElement>()

    type IProps={
        top?:number
        bottom?:number
        ifNoScroll?:boolean
    };
    type IEmits={
        (e:'onScroll',value:number):void
    }
    const props=withDefaults(defineProps<IProps>(),{
        top:0,
        bottom:0,
        ifNoScroll:false
    })
    const emit=defineEmits<IEmits>()
    const handleScroll=(e:UIEvent)=>{
        const offsetY=(e.target as HTMLElement).scrollTop || window.pageYOffset || document.body.scrollTop
        emit('onScroll',offsetY)
    }
    const scrollTo=(x:any,y:any)=>{
        scrollWrapper.value?.scrollTo(x,y)
    }
    const refresh=()=>{
        if(scrollWrapper.value){
            scrollWrapper.value.style.height = window.innerHeight-realPx(props.top)-realPx(props.bottom)+'px'
        }
    }
    onMounted(()=>{
        refresh()
    })

</script>

<template>
    <div 
    class="scroll-wrapper"
    :class="{'no-scroll':ifNoScroll}"
    @scroll.passive="handleScroll"
    ref="scrollWrapper">
        <slot></slot>
    </div>
</template>

<style scoped lang="scss">
.scroll-wrapper{
    position: relative;
    z-index: 100;
    width: 100%;
    overflow-x: hidden;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar{
        display: none;
    }
    &.no-scroll{
        overflow: hidden;
    }
}
</style>