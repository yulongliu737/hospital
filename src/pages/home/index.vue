<script setup lang="ts">
import Carousel from './carousel/index.vue'
import Search from './search/index.vue'
import Level from '@/pages/home/level/index.vue'
import Region from '@/pages/home/region/index.vue'
import Card from '@/pages/home/card/index.vue'
import {onMounted, ref} from 'vue'
import {reqHospital} from "@/api/home";
import type {Content, HospitalResponseData} from "@/api/home/type.ts";

let curPage = ref<number>(1)
let pageSize = ref<number>(10)
let hospitalArr = ref<Content>([])
let total = ref<number>(0)
onMounted(() => {
  getHospitalInfo()
})

// 获取已有的医院数据
const getHospitalInfo = async () => {
  let res: HospitalResponseData = await reqHospital(curPage.value, pageSize.value, hostype.value, districtCode.value);
  if (res.code === 200) {
    hospitalArr.value = res.data.content;
    total.value = res.data.totalElements;
  }
  return res
}

// 分页器页码发生变化时候回调
const currentChange = async () => {
  await getHospitalInfo()
}
// 下拉选项变化时
const sizeChange = async () => {
  await getHospitalInfo()
}

let hostype = ref<string>('')
let districtCode = ref<string>('')

async function getLevel(val: string) {
  hostype.value = val
  await getHospitalInfo()
}

async function getRegion(val: string) {
  districtCode.value = val
  await getHospitalInfo()
}
</script>

<template>
  <Carousel></Carousel>
  <Search></Search>
  <el-row :gutter="20">
    <el-col :span="20">
      <Level @getLevel="getLevel"></Level>
      <Region @getRegion="getRegion"></Region>
      <div class="hospitals" v-show="hospitalArr.length">
        <Card class="card" v-for="(item, index) in hospitalArr" :key="index" :hospitalInfo="item"></Card>
        <el-pagination
            v-model:current-page="curPage"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 30, 40]"
            :background="true"
            layout="prev, pager, next, total, ->, jumper, sizes"
            :total="total"
            style="width: 100%;"
            @current-change="currentChange()"
            @size-change="sizeChange()"
        />
      </div>
      <el-empty description="没有可以展示的医院" v-show="hospitalArr.length === 0"/>
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