<script setup lang="ts">
import {onMounted, ref} from "vue";
import type {HospitalLevelAndRegionArr, HospitalLevelAndRegionResponseData} from "@/api/home/type.ts";
import {reqHospitalLevelAndRegion} from "@/api/home";

onMounted(() => {
  getHospitalRegion()
})

let regionArr = ref<HospitalLevelAndRegionArr>([])

// 获取已有的医院数据
const getHospitalRegion = async () => {
  let res: HospitalLevelAndRegionResponseData = await reqHospitalLevelAndRegion('Beijin');
  if (res.code === 200) {
    regionArr.value = res.data
  }
}
let activeFlag = ref<string>('')

const changeRegion = (val: string) => {
  activeFlag.value = val
  $emit('getRegion', val)
}

let $emit = defineEmits(['getRegion'])
</script>

<template>
  <div class="region">
    <div class="content">
      <div class="left">地区：</div>
      <ul>
        <li :class="{active:activeFlag === ''}" @click="changeRegion('')">全部</li>
        <li :class="{active:activeFlag === region.value}" v-for="region in regionArr" :key = "region.id" @click="changeRegion(region.value)">{{region.name}}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.region {
  color: #7f7f7f;
  margin-top: 10px;
  .content {
    display: flex;
    .left {
      margin-right: 10px;
      width: 48px;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        margin-right: 10px;
        margin-bottom: 5px;
        &.active {
          color: #55a6fe
        }
      }
      li:hover {
        color: #55a6fe;
        cursor:pointer;
      }
    }
  }
}
</style>