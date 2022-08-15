<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#2d3a4b"
    default-active="/"
    text-color="#fff"
    router
    :collapse="!$store.state.layoutStore.isExpand"
    class="el-menu-vertical-demo"
    style="height: 100%"
    :unique-opened="false"
  >
    <MenuItem v-for="item in menuList" :key="item.id" :menuData="item" />
  </el-menu>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import MenuItem from "./MenuItem.vue";
const store = useStore();
const menuList = computed(() => store.state.userStore.userInfo.menus);
console.log(store.state.userStore.userInfo.menus);
</script>

<style lang="scss" scoped>
/* 取消menu的右侧边框 */
.el-menu {
  border: none;
}
</style>
