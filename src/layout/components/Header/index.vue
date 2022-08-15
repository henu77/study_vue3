<template>
  <div class="header">
    <!-- 左侧 -->
    <div class="header_left">
      <!-- 菜单收缩 -->
      <ExpandToggle />
      <!-- 面包屑 -->
      <Breadcrumb />
    </div>
    <!-- 右侧 -->
    <div class="header_right">
      <!-- 搜索 -->
      <Search />
      <!-- 通知 -->
      <Notify />
      <!-- 主题切换 -->
      <ThemeToggle />
      <!-- 全屏 -->
      <FullScreen />
      <!-- 国际化 -->
      <Language />
      <UserDropDown />
    </div>
    <!-- tag标签 -->
    <div class="header_tag">
      <Tag />
    </div>
  </div>
</template>

<script setup>
import {
  ExpandToggle,
  Breadcrumb,
  Search,
  Notify,
  FullScreen,
  ThemeToggle,
  Language,
  UserDropDown,
  Tag,
} from "./components/index";
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-wrap: wrap;
  position: relative;
  padding: 0 20px;

  .header_left {
    display: flex;
    align-items: center;
  }

  .header_right {
    display: flex;
    align-items: center;
  }

  .header_tag {
    position: absolute;
    left: 0;
    bottom: -53px;
    width: calc(100% - 10px);
    height: 24px;
    /* @include bg_color(); */
    background-color: var(--el-bg-color);
    border-bottom: 1px solid var(--el-border-color);
    border-top: 1px solid var(--el-border-color);
    display: flex;
    align-items: center;
    padding: 5px;
    /* box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%); */
  }
}
</style>
