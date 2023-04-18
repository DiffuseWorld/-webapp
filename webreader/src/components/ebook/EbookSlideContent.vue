<script setup lang="ts">
import { ref,onMounted } from 'vue'
import { useBook } from '@/stores'
import { useGetReadTimeText,useRefreshLocation } from './hooks/refreshLocation'
import Scroll from '../common/Scroll.vue';
import { text } from 'stream/consumers';

const searchVisible = ref(false)
const searchList = ref<any>(null)
const searchText = ref('')
const bookStore = useBook()

const hideSearchPage = () => {
    searchVisible.value = false
    searchList.value=null
    searchText.value = ''
}
const showSearchPage = () => {
    searchVisible.value = true
}
const getReadTime = () => {
    return useGetReadTimeText()
}
/**
 * 动态进行计算
 * @param item 
 */
const contentItemStyle=(item:any)=>{
    return {
        marginLeft: `${item.level}px`
    }
}

/**
 * 关系有点复杂，索性直接使用索引来更改section
 * @param item 
 * @param index 
 */
const goToPageBySection=(item:any,index:number)=>{
    bookStore.currentbook?.rendition.display(item.href).then((d:any)=>{
        bookStore.section=index
        console.log(item)
        useRefreshLocation()
    })
}

/**
 * epub的全文搜索算法
 */
const doSearch = (q:any) =>{
    return Promise.all(
        // @ts-ignore
        bookStore.currentbook?.spine.spineItems.map(
            // @ts-ignore
            section=> section.load(bookStore.currentbook?.load.bind(bookStore.currentbook))
            .then(
                section.find.bind(section,q)
            )
            .finally(section.unload.bind(section))
        )
        // @ts-ignore
    ).then(res => Promise.resolve([].concat.apply([],res).filter((_,index)=>{
        return index!==0 // 过滤掉第一条数据
    })))
}


const search = () =>{
    if(searchText.value && searchText.value.length>0){
        doSearch(searchText.value).then(result=>{
            console.log('我得出了结果',result)
            searchList.value = result
            searchList.value.map((_:any)=>{
                // 对搜素结果的关键字进行高亮显示
                _.excerpt = _.excerpt.replace(searchText.value,`<span class="content-search-text">${searchText.value}</span>`)
                return _
            })
        })
    }
}

/**
 * 根据搜索内容进行跳转
 * @param item 
 */
const tiaozhuan = (item:any,hightLight:boolean=false) => {
    bookStore.currentbook?.rendition.display(item.cfi).then(()=>{
        if(hightLight){
            bookStore.currentbook?.rendition.annotations.highlight(item.cfi) // 对关键字进行高亮显示
        }
    })
    useRefreshLocation()
    resetSearchState()
}

const resetSearchState=()=>{
    searchList.value=null
    searchText.value=''
    searchVisible.value=false
}

onMounted(()=>{

})
</script>

<template>
    <div class="ebooks-silde-contents">
        <div class="slide-contents-search-wrapper">
            <div class="slide-contents-search-input-wrapper">
                <div class="slide-contents-search-icon">
                    <span class="icon-search"></span>
                </div>
                <input 
                type="text"
                 class="slide-contents-search-input" 
                 :placeholder="'没事搜一下'" 
                 @click="showSearchPage" 
                 v-model="searchText"
                 @keyup.enter.exact="search">
            </div>
            <div class="slide-contents-search-cancel" v-if="searchVisible" @click="hideSearchPage">取消</div>
        </div>
        <div class="slide-contents-book-wrapper" v-show="!searchVisible">
            <div class="slide-contents-book-img-wrapper">
                <img :src="bookStore.cover" alt="" class="slide-contents-book-img">
            </div>
            <div class="slide-contents-book-info-wrapper">
                <div class="slide-contents-book-title">{{ bookStore.metadata?.title }}</div>
                <div class="slide-contents-book-author">{{ bookStore.metadata?.creator }}</div>
            </div>
            <div class="slide-contents-book-progress-wrapper">
                <div class="slide-contents-book-progress">
                    <span class="progress">{{ bookStore.progress + '%' }}</span>
                    <span class="progress-text">已读</span>
                </div>
                <div class="slide-contents-book-time">{{ getReadTime() }}</div>
            </div>
        </div>
        <Scroll class="slide-contents-list" :top="158" :bottom="48" ref="scroll">
            <div class="slide-contents-item" v-for="(item,index) in bookStore.navigition" 
            v-show="!searchVisible"
            :key="index">
                <span class="slide-contents-item-label"
                :style="contentItemStyle(item)"
                :class="{'selected':bookStore.section===index}"
                @click="goToPageBySection(item,index)">{{ item.label }}</span>
                <div class="slide-contents-item-page"></div>
            </div>
        </Scroll>
        <Scroll class="slide-search-list" :top="66" :bottom="48" v-show="searchVisible">
            <div class="slide-search-item" v-for="(item,index) in searchList"
            v-html="item.excerpt"
            @click="tiaozhuan(item,true)">
                
            </div>
        </Scroll>
    </div>
</template>

<style lang="scss" scoped>
.ebooks-silde-contents {
    width: 100%;
    font-size: 0;

    .slide-contents-search-wrapper {
        display: flex;
        width: 100%;
        height: 40px;
        margin: 20px 0 10px 0;
        padding: 0 15px;
        box-sizing: border-box;

        .slide-contents-search-input-wrapper {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;

            .slide-contents-search-icon {
                display: flex;
                align-items: center;
                justify-content: center;
                flex: 0 0 28;
                font-size: 12px;
            }

            .slide-contents-search-input {
                flex: 1;
                width: 100%;
                height: 40px;
                font-size: 14px;
                background: transparent;
                border: none;

                &:focus {
                    outline: none; // 去掉点击输入框时的边框
                }
            }
        }

        .slide-contents-search-cancel {
            flex: 0 0 70px;
            font-size: 14px;
            display: flex;
            justify-content: right;
            align-items: center;
        }
    }

    .slide-contents-book-wrapper {
        display: flex;
        width: 100%;
        height: 150px;
        padding: 10px 15px 20px 15px;
        box-sizing: border-box;

        .slide-contents-book-img-wrapper {
            flex: 0 0 60px;

            .slide-contents-book-img {
                width: 100px;
                height: 100%;
            }
        }

        .slide-contents-book-info-wrapper {
            flex: 1;
            padding: 10px 20px;

            .slide-contents-book-title {
                // width: 400px;
                width: 200px;
                font-size: 14px;
                display: -webkit-box;
                -webkit-box-orient: vertical; // 垂直
                -webkit-line-clamp: 2; // 设置文本只显示两行
                overflow: hidden;
                text-overflow: ellipsis;
                word-break: keep-all; // 当单词显示完才换行
            }

            .slide-contents-book-author {
                width: 400px;
                font-size: 12px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }
        }

        .slide-contents-book-progress-wrapper {
            flex: 1;
            padding: 10px 0px;

            .slide-contents-book-progress {
                .progress {
                    font-size: 10px;
                }

                .progress-text {
                    font-size: 8px;
                }
            }

            .slide-contents-book-time {
                font-size: 12px;
            }
        }
    }
    .slide-contents-list{
        padding: 0 15px;
        box-sizing: border-box;
        .slide-contents-item{
            display: flex;
            padding: 20px 0;
            box-sizing: border-box;
            .slide-contents-item-label{
                flex: 1;
                font-size: 14px;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
            }
            .slide-contents-item-page{
                font-size: 14px;
            }
        }
    }
    .slide-search-list{
        width: 100%;
        padding: 0 15px;
        box-sizing: border-box;
        .slide-search-item{
            font-size: 14px;
            line-height: 16px;
            padding: 20px 0;
            box-sizing: border-box;
        }
    }
}</style>