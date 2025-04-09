<script setup lang="ts">
import {onMounted, ref} from "vue"
import {reqAppointmentRegistration} from "@/api/hospital"
import {useRoute} from "vue-router"
import type {HospitalWorkData} from "@/api/hospital/type.ts"
let curPage = ref<number>(1)
let pageSize = ref<number>(6)
let workData = ref<any>({})
let $route = useRoute();
onMounted(() => {
  fetchWorkData()
})

// 获取挂号数据
const fetchWorkData = async() => {
  let res: HospitalWorkData = await reqAppointmentRegistration(curPage.value, pageSize.value, $route.query.hoscode as string, $route.query.depcode as string)
  // console.log(JSON.stringify(res))
  if (res.code === 200) {
    workData.value = res.data
  }
}
const changePage = () => {
  fetchWorkData()
}
</script>

<template>
<div class="wrap">
  <div class="top">
    <div class="hosname">{{ workData.baseMap?.hosname }}</div>
    <div class="line"></div>
    <div>{{ workData.baseMap?.bigname }}</div>
    <div class="dot">.</div>
    <div class="hosdeparment">{{ workData.baseMap?.depname }}</div>
  </div>
  <div class="center">
    <h1>{{ workData.baseMap?.workDateString }}</h1>
    <div class="container">
      <div class="item" :class = "{active:item.status === -1 || item.availableNumber === -1}" v-for="item in workData.bookingScheduleList" :key = "item">
        <div class="top_item">{{ item.workDateMd }} {{ item.dayOfWeek }}</div>
        <div class="bottom">
          <div v-if="item.status === -1">停止挂号</div>
          <div v-if="item.status === 0">
            {{
              item.availableNumber === -1 ? "预约已满" : `剩余(${item.availableNumber})`
            }}
          </div>
        </div>
      </div>
    </div>
    <el-pagination v-model:current-page="curPage" layout="prev, pager, next" :total="workData.total" @current-change="changePage()"/>
  </div>
</div>
</template>

<style scoped lang="scss">
.wrap {
  .top {
    display: flex;
    color: #7f7f7f;
    .line {
      width: 1px;
      height: 19px;
      background: #7f7f7f;
      margin: 0 8px;
    }
    .dot {
      margin: 0 6px;
      color: #7f7f7f;
    }
  }
  .center {
    margin: 20px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    h1 {
      font-weight: 600;
      font-size: 17px;
      margin: 10px 0;
    }
    .container {
      width: 100%;
      display: flex;
      .item {
        flex: 1;
        border: 1px solid skyblue;
        margin: 10px 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        &.active {
          border: 1px solid #ccc;
          color: #7f7f7f;
          .top_item {
            background: #ccc;
          }
        }
        .top_item {
          background: #e8f2ff;
          height: 28px;
          width: 100%;
          text-align: center;
          line-height: 28px;
        }
        .bottom {
          width: 100%;
          height: 60px;
          text-align: center;
          line-height: 60px;
        }
      }
    }
  }
}
</style>