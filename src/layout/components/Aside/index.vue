<template>
  <el-scrollbar
    height="100%"
    :wrap-style="{
      background: '#2d3a4b',
    }"
  >
    <!-- logo -->
    <div class="logo">
      {{ $store.state.layoutStore.isExpand ? "ZZQ0301" : "ZZQ" }}
    </div>
    <!-- 导航菜单 -->
    <Menu />
  </el-scrollbar>
</template>

<script setup>
import Menu from "./components/Menu.vue";
</script>

<style lang="scss" scoped></style>
