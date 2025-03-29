<script setup lang="ts">
import Carousel from './carousel/index.vue'
import Search from './search/index.vue'
import Level from './../level/index.vue'
import Region from './../region/index.vue'
</script>

<template>
  <Carousel></Carousel>
  <Search></Search>
  <el-row :gutter="20">
    <el-col :span="20">
      <Level></Level>
      <Region></Region>
    </el-col>
    <el-col :span="4">
      456
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">

</style>