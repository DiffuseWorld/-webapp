<script setup lang="ts">
import {ref} from 'vue'
import {useBook} from '@/stores'
import {useGetReadTimeText} from './hooks/refreshLocation'

const searchVisible=ref(false)
const bookStore=useBook()

const hideSearchPage=()=>{
    searchVisible.value=false
}
const showSearchPage=()=>{
    searchVisible.value=true
}
const getReadTime=()=>{
    return useGetReadTimeText()
}
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
                @click="showSearchPage">
            </div>
            <div 
            class="slide-contents-search-cancel"
            v-if="searchVisible"
            @click="hideSearchPage">取消</div>
        </div>
        <div class="slide-contents-book-wrapper">
            <div class="slide-contents-book-img-wrapper">
                <img :src="bookStore.cover" alt="" class="slide-contents-book-img">
            </div>
            <div class="slide-contents-book-info-wrapper">
                <div class="slide-contents-book-title">{{ bookStore.metadata?.title }}</div>
                <div class="slide-contents-book-author">{{ bookStore.metadata?.creator }}</div>
            </div>
            <div class="slide-contents-book-progress-wrapper">
                <div class="slide-contents-book-progress">
                    <span class="progress">{{ bookStore.progress+'%' }}</span>
                    <span class="progress-text">已读</span>
                </div>
                <div class="slide-contents-book-time">{{ getReadTime() }}</div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.ebooks-silde-contents{
    width: 100%;
    font-size: 0;
    .slide-contents-search-wrapper{
        display: flex;
        width: 100%;
        height: 40px;
        margin: 20px 0 10px 0;
        padding: 0 15px;
        box-sizing: border-box;
        .slide-contents-search-input-wrapper{
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            .slide-contents-search-icon{
                display: flex;
                align-items: center;
                justify-content: center;
                flex: 0 0 28;
                font-size: 12px;
            }
            .slide-contents-search-input{
                flex: 1;
                width: 100%;
                height: 40px;
                font-size: 14px;
                background: transparent;
                border: none;
                &:focus{
                    outline: none;// 去掉点击输入框时的边框
                }
            }
        }
        .slide-contents-search-cancel{
            flex: 0 0 70px;
            font-size: 14px;
            display: flex;
            justify-content: right;
            align-items: center;
        }
    }
    .slide-contents-book-wrapper{
        display: flex;
        width: 100%;
        height:150px;
        padding: 10px 15px 20px 15px;
        box-sizing: border-box;
        .slide-contents-book-img-wrapper{
            flex: 0 0 60px;
            .slide-contents-book-img{
                width: 100px;
                height: 100%;
            }
        }
        .slide-contents-book-info-wrapper{
            flex: 1;
            padding:10px 20px;
            .slide-contents-book-title{
                // width: 400px;
                width: 200px;
                font-size: 14px;
                display: -webkit-box;
                -webkit-box-orient: vertical;// 垂直
                -webkit-line-clamp: 2;// 设置文本只显示两行
                overflow: hidden;
                text-overflow: ellipsis;
                word-break: keep-all;// 当单词显示完才换行
            }
            .slide-contents-book-author{
                width: 400px;
                font-size: 12px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }
        }
        .slide-contents-book-progress-wrapper{
            flex: 1;
            padding: 10px 0px;
            .slide-contents-book-progress{
                .progress{
                    font-size: 10px;
                }
                .progress-text{
                    font-size: 8px;
                }
            }
            .slide-contents-book-time{
                font-size: 12px;
            }
        }
    }
}
</style>