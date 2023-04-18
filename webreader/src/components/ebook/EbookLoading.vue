<script lang="ts" setup>
import { endianness } from 'os';
import { ref, onMounted, onBeforeUnmount } from 'vue'

const data = ref([[{}, {}, {}], [{}, {}, {}]])
const mask = ref<{ value: number }[]>([
    {
        value: 0
    },
    {
        value: 0
    },
    {
        value: 0
    },
    {
        value: 0
    },
    {
        value: 0
    },
    {
        value: 0
    },
])
const lineWidth = ref<{ value: number }[]>([
    {
        value: 16
    },
    {
        value: 16
    },
    {
        value: 16
    },
    {
        value: 16
    },
    {
        value: 16
    },
    {
        value: 16
    },
])
const line = ref<HTMLElement | HTMLElement[]>()
const mask1 = ref<HTMLElement | HTMLElement[]>()
const add = ref(true)
const end = ref(false)
// @ts-ignore
let intt = null
onMounted(() => {
    intt = setInterval(() => {
        mask.value.forEach((_, index) => {
            const maskk = (mask1.value as HTMLElement[])[index]
            const linee = (line.value as HTMLElement[])[index]
            let maskwidth = mask.value[index]
            let linewidth = lineWidth.value[index]
            if (index === 0) {
                if (add.value && maskwidth.value<16) {
                    maskwidth.value++
                    linewidth.value--
                } else if(!add.value && maskwidth.value<16){
                    maskwidth.value--
                    linewidth.value++
                }
            }else{
                if(add.value){
                    let preMaskwidth = mask.value[index-1]
                    if(preMaskwidth.value >= 8){
                        maskwidth.value++
                        linewidth.value--
                    }
                }else if(!add.value && maskwidth.value<16){
                    let preLineWidth = lineWidth.value[index-1]
                    if(preLineWidth.value >=8){
                        maskwidth.value--
                        linewidth.value++
                    }
                }
            }
            maskk.style.width = `${maskwidth.value}px`
            maskk.style.flex = `0 0 ${maskwidth.value}px`
            linee.style.width = `${linewidth.value}px`
            linee.style.flex = `0 0 ${linewidth.value}px`
            if (index === mask.value.length - 1) {
                if (add.value) {
                    if (maskwidth.value === 16) {
                        end.value = true
                    }
                } else {
                    if (maskwidth.value === 0) {
                        end.value = true
                    }
                }
            }
            if (end.value) {
                add.value = !add.value
                end.value = false
            }
        })
    }, 500)
})


onBeforeUnmount(() => {
    // @ts-ignore
    if (intt) {
        clearInterval(intt)
    }
})
</script>

<template>
    <div class="ebook-loading">
        <div class="ebook-loading-wrapper">
            <div class="ebook-loading-item" v-for="(item, index) in data" :key="index">
                <div class="ebook-loading-line-wrapper" v-for="(subItem, subIndex) in item" :key="subIndex">
                    <div class="book-loading-line" ref="line"></div>
                    <div class="book-loading-mask" ref="mask1"></div>
                </div>
            </div>
            <div class="ebook-loading-center"></div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.ebook-loading {
    position: relative;
    z-index: 400;
    width: 63px;
    height: 40px;
    background: transparent;
    border: 1.5px solid #d7d7d7;
    border-radius: 3px;

    .ebook-loading-wrapper {
        display: flex;
        width: 100%;
        height: 100%;

        .ebook-loading-item {
            flex: 1;
            display: flex;
            flex-direction: column;
            padding: 7px 0px;
            box-sizing: border-box;

            .ebook-loading-line-wrapper {
                flex: 1;
                display: flex;
                justify-content: left;
                align-items: center;
                padding: 0 7px;
                box-sizing: border-box;

                .book-loading-line {
                    flex: 0 0 16px;
                    width: 16px;
                    height: 2px;
                    background-color: #d7d7d7;
                }

                .book-loading-mask {
                    flex: 0 0 10px;
                    width: 10px;
                    height: 2px;
                }
            }
        }
    }

    .ebook-loading-center {
        position: absolute;
        left: 50%;
        top: 0;
        width: 1.5px;
        height: 100%;
        background: #d7d7d7;
    }
}
</style>