<script setup lang="ts">
import {onMounted, ref} from "vue";
import type {HospitalLevelAndRegionArr, HospitalLevelAndRegionResponseData} from "@/api/home/type.ts";
import { reqHospitalLevelAndRegion} from "@/api/home";

onMounted(() => {
  getHospitalLevel()
})

let levelArr = ref<HospitalLevelAndRegionArr>([])

// 获取已有的医院数据
const getHospitalLevel = async () => {
  let res: HospitalLevelAndRegionResponseData = await reqHospitalLevelAndRegion('HosType');
  if (res.code === 200) {
    levelArr.value = res.data
  }
}
</script>

<template>
  <div class="level">
    <h1>医院</h1>
    <div class="content">
      <div class="left">
        等级：
      </div>
      <ul class="hospital">
        <li class="active">全部</li>
        <li v-for="item in levelArr" :key = "item.id">{{ item.name }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
 .level {
   color: #7f7f7f;
   h1 {
     font-weight: 900;
     font-size: 15px;
     margin: 10px 0;
   }
   .content {
     display: flex;
     .left {
       margin-right: 10px;
     }
     .hospital {
       display: flex;
       li {
         margin-right: 10px;
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