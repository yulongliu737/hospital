<script setup lang="ts">
  import { Search } from '@element-plus/icons-vue'
</script>

<template>
  <div class="search">
    <div class="search-bar">
      <el-autocomplete
          clearable
          placeholder="请输入医院名称"
          class="search-autocomplete"
      />
      <el-button type="primary" :icon="Search" class="searchBtn">搜索</el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.search {
  width: 80%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  .search-bar {
    width: 1000px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    .searchBtn {
      margin-left: 10px;
    }
  }
}
</style>