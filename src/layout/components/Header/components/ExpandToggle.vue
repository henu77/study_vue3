<template>
  <el-tooltip effect="dark" :content="content" placement="right">
    <el-icon class="toggle" size="26px" @click="handleClick">
      <component
        :is="$store.state.layoutStore.isExpand ? 'Fold' : 'Expand'"
      ></component>
    </el-icon>
  </el-tooltip>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
const content = computed(() =>
  store.state.layoutStore.isExpand ? "收缩" : "展开"
);
function handleClick() {
  store.commit("setIsExpand");
}
</script>

<style lang="scss" scoped>
.toggle {
  cursor: pointer;
}
</style>
