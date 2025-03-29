<script setup lang="ts">
import Carousel from './carousel/index.vue'
import Search from './search/index.vue'
import Level from '@/pages/home/level/index.vue'
import Region from '@/pages/home/region/index.vue'
import Card from '@/pages/home/card/index.vue'
import {ref} from 'vue'
let curPage = ref<number>(1);
let pageSize = ref<number>(10);
</script>

<template>
  <Carousel></Carousel>
  <Search></Search>
  <el-row :gutter="20">
    <el-col :span="20">
      <Level></Level>
      <Region></Region>
      <div class="hospitals">
        <Card class="card" v-for="item in 10" :key="item"></Card>
        <el-pagination
            v-model:current-page="curPage"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 30, 40]"
            :background="true"
            layout="prev, pager, next, total, ->, jumper, sizes"
            :total="13"
            style="width: 100%;"
        />
      </div>
    </el-col>
    <el-col :span="4">
      456
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">
.hospitals {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  .card {
    width: 48%;
    margin: 10px 6px;
  }
}
</style>