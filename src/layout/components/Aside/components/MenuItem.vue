<template>
  <!--  渲染单击菜单 -->
  <el-menu-item
    :index="menuData.url || menuData.id + ''"
    v-if="!hasChildren(menuData)"
  >
    <el-icon v-if="menuData.icon">
      <!-- 动态组件 -->
      <component :is="handleMenuIconName(menuData.icon)"></component>
    </el-icon>
    <template #title>
      <span>{{ menuData.title }}</span>
    </template>
  </el-menu-item>
  <el-sub-menu v-else :index="menuData.url || menuData.id + ''">
    <template #title>
      <el-icon v-if="menuData.icon">
        <component :is="handleMenuIconName(menuData.icon)"></component>
      </el-icon>
      <span>{{ menuData.title }}</span>
    </template>
    <template v-if="menuData.children">
      <MenuItem
        v-for="child in menuData.children"
        :key="child.id"
        :menuData="child"
      />
    </template>
  </el-sub-menu>
</template>

<script>
export default {
  name: "MenuItem",
  props: {
    menuData: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  setup() {
    function hasChildren(item) {
      return item.children && item.children.length;
    }
    function handleMenuIconName(name) {
      return name.slice(8);
    }
    return {
      hasChildren,
      handleMenuIconName,
    };
  },
};
</script>

<style lang="scss" scoped>
.el-menu {
  border: none;
}
</style>
