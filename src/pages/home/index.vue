<script setup lang="ts">
import Carousel from './carousel/index.vue'
import Search from './search/index.vue'
import Level from '@/pages/home/level/index.vue'
import Region from '@/pages/home/region/index.vue'
import Card from '@/pages/home/card/index.vue'
import {onMounted, ref} from 'vue'
import {reqHospital} from "@/api/home";
let curPage = ref<number>(1)
let pageSize = ref<number>(10)
let hospitalArr = ref([])
let total = ref(0)
onMounted(() => {
  getHospitalInfo()
})

// 获取已有的医院数据
const getHospitalInfo = async () => {
  let res: any = await reqHospital(curPage.value, pageSize.value);
  console.log(JSON.stringify("已有医院数据:" + JSON.stringify(res)));
  if (res.code === 200) {
    hospitalArr.value = res.data.content;
    total.value = res.data.totalElements;
  }
  return res
}
</script>

<template>
  <Carousel></Carousel>
  <Search></Search>
  <el-row :gutter="20">
    <el-col :span="20">
      <Level></Level>
      <Region></Region>
      <div class="hospitals">
        <Card class="card" v-for="(item, index) in hospitalArr" :key="index" :hospitalInfo = "item"></Card>
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