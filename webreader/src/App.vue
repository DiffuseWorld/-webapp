<script setup lang="ts">

</script>

<template>
  <RouterView></RouterView>
</template>

<script lang="ts">
/* 遗留的坑，最好使用插件之类的工具来辅助单位转换
const tz=()=>{
  document.addEventListener('DOMContentLoaded', () => {
    const html = document.querySelector('html') as HTMLElement
    let fontSize = window.innerHeight / 10
    fontSize = fontSize > 50 ? 50 : fontSize
    html.style.fontSize = fontSize + 'px'
  })
}
tz()
window.addEventListener('resize', () => {
  tz()
}) */
</script>

<style scoped  lang="scss">
#app{
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>
