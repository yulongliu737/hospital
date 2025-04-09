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
          <div v-if="item.status === 1">即将放号</div>
        </div>
      </div>
    </div>
    <el-pagination v-model:current-page="curPage" v-model:page-size="pageSize" layout="prev, pager, next" :total="workData.total" @current-change="changePage()"/>
  </div>
  <div class="bottom">
    <div class="will">
      <span class = "time">2023年6月3日08：30</span>
      <span>放号</span>
    </div>
    <div class="doctor">
      <div class="morning">
        <div class="tip">
          <svg t="1744202507107" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1875" width="32" height="32"><path d="M253.125539 756.458152H770.875485v57.552673H253.125539zM396.940704 842.747252H627.060319v57.554719H396.940704zM943.454707 555.14455v-57.554719h-102.021378c-8.76153-51.345309-29.436367-99.547028-59.210425-141.371515l83.200768-83.143463-40.67327-40.700899-79.435008 79.408402c-54.605556-55.419083-126.681984-92.69396-204.544174-100.222409V123.697006h-57.541416v87.834289c-75.446169 7.218387-143.379238 42.385258-194.642683 95.811968l-74.95396-74.970333L172.958868 273.07383l79.421705 79.407379c-28.510277 42.218459-48.05948 91.598001-56.037159 145.107599H80.54427v57.554718h111.684438c0.477883 39.63257 8.271367 78.142575 22.835033 115.052133H109.30935v57.497414h805.382324v-57.497414h-91.401527c14.549338-36.908534 22.360219-75.418539 22.863684-115.052133h97.300876v0.001024zM277.562042 670.196682c-18.566831-37.668849-28.032394-77.693345-28.032394-119.066554 0-153.732006 120.191166-283.616932 262.476492-283.616933 147.468362 0 276.844706 132.525051 276.844705 283.616933 0 41.374234-9.493193 81.398729-28.032394 119.066554H277.562042z" fill="#1D2087" p-id="1876"></path></svg>
          <span>上午号源</span>
        </div>
        <div class="doc_info">
          <div class="left">
            <div class="info">
              <span>副主任医师</span>
              <span>|</span>
              <span>贾程浩</span>
            </div>
            <div class="skill">骨质疏松和骨代谢疾病 糖尿病 甲状腺疾病</div>
          </div>
          <div class="right">
            <div class="money">
              ￥100
            </div>
            <el-button type="primary" size="default">100</el-button>
          </div>
        </div>
        <div class="doc_info">
          <div class="left">
            <div class="info">
              <span>副主任医师</span>
              <span>|</span>
              <span>贾宝玉</span>
            </div>
            <div class="skill">骨质疏松和骨代谢疾病 糖尿病 甲状腺疾病</div>
          </div>
          <div class="right">
            <div class="money">
              ￥100
            </div>
            <el-button type="primary" size="default">100</el-button>
          </div>
        </div>
      </div>
      <div class="after">
        <div class="tip">
          <svg t="1744200950802" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1656" width="32" height="32"><path d="M513.123 795.991c-76.156 0-147.753-29.658-201.603-83.508-53.849-53.849-83.504-125.444-83.504-201.596 0-76.153 29.657-147.749 83.504-201.598 53.85-53.851 125.446-83.508 201.603-83.508 76.147 0 147.742 29.658 201.593 83.508 53.853 53.852 83.511 125.447 83.511 201.598s-29.659 147.747-83.511 201.597c-53.852 53.85-125.445 83.507-201.593 83.507zM513.123 272.352c-131.529 0-238.534 107.007-238.534 238.535s107.006 238.533 238.534 238.533 238.533-107.005 238.533-238.533c0-131.529-107.006-238.535-238.533-238.535z" fill="#CCCCCC" p-id="1657"></path><path d="M513.123 149.007c-12.861 0-23.285-10.426-23.285-23.285v-91.359c0-12.861 10.426-23.285 23.285-23.285s23.285 10.426 23.285 23.285v91.358c0 12.862-10.426 23.286-23.285 23.286z" fill="#CCCCCC" p-id="1658"></path><path d="M513.123 1010.674c-12.861 0-23.285-10.426-23.285-23.285v-91.346c0-12.861 10.426-23.285 23.285-23.285s23.285 10.426 23.285 23.285v91.346c0 12.861-10.426 23.285-23.285 23.285z" fill="#CCCCCC" p-id="1659"></path><path d="M240.764 261.825c-5.959 0-11.919-2.274-16.466-6.821l-64.592-64.591c-9.094-9.093-9.094-23.838 0-32.931 9.093-9.094 23.838-9.094 32.931 0l64.593 64.592c9.094 9.093 9.094 23.838 0 32.931-4.546 4.545-10.507 6.82-16.467 6.82z" fill="#CCCCCC" p-id="1660"></path><path d="M850.050 871.111c-5.958 0-11.919-2.272-16.467-6.82l-64.593-64.593c-9.093-9.094-9.093-23.839 0-32.932 9.094-9.094 23.839-9.094 32.932 0l64.593 64.593c9.093 9.094 9.093 23.839 0 32.932-4.546 4.545-10.507 6.82-16.466 6.82z" fill="#CCCCCC" p-id="1661"></path><path d="M36.59 534.183c-12.861 0.001-23.286-10.423-23.289-23.283-0.001-12.861 10.423-23.286 23.283-23.289l91.348-0.011c12.861-0.001 23.286 10.423 23.289 23.283 0.001 12.861-10.423 23.286-23.283 23.289l-91.348 0.011z" fill="#CCCCCC" p-id="1662"></path><path d="M989.613 534.173h-91.346c-12.861 0-23.285-10.426-23.285-23.285s10.426-23.285 23.285-23.285h91.346c12.861 0 23.285 10.426 23.285 23.285s-10.426 23.285-23.285 23.285z" fill="#CCCCCC" p-id="1663"></path><path d="M176.173 871.122c-5.959 0-11.919-2.272-16.466-6.82-9.094-9.094-9.094-23.839 0-32.932l64.593-64.593c9.094-9.094 23.838-9.094 32.931 0s9.094 23.839 0 32.932l-64.593 64.593c-4.546 4.546-10.506 6.82-16.466 6.82z" fill="#CCCCCC" p-id="1664"></path><path d="M785.457 261.825c-5.959 0-11.918-2.272-16.467-6.821-9.094-9.094-9.093-23.838 0.001-32.931l64.593-64.592c9.094-9.093 23.838-9.094 32.931 0s9.093 23.838-0.001 32.931l-64.593 64.592c-4.545 4.546-10.506 6.821-16.465 6.821z" fill="#CCCCCC" p-id="1665"></path></svg>
          <span>下午号源</span>
        </div>
        <div class="doc_info">
          <div class="left">
            <div class="info">
              <span>副主任医师</span>
              <span>|</span>
              <span>贾程浩</span>
            </div>
            <div class="skill">骨质疏松和骨代谢疾病 糖尿病 甲状腺疾病</div>
          </div>
          <div class="right">
            <div class="money">
              ￥100
            </div>
            <el-button type="primary" size="default">100</el-button>
          </div>
        </div>
        <div class="doc_info">
          <div class="left">
            <div class="info">
              <span>副主任医师</span>
              <span>|</span>
              <span>贾宝玉</span>
            </div>
            <div class="skill">骨质疏松和骨代谢疾病 糖尿病 甲状腺疾病</div>
          </div>
          <div class="right">
            <div class="money">
              ￥100
            </div>
            <el-button type="primary" size="default">100</el-button>
          </div>
        </div>
      </div>
    </div>
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
  .bottom {
    .will {
      text-align: center;
      font-size: 30px;
      font-weight: 900;
      .time {
        color: red;
        margin: 10px 10px;
      }
    }
    .doctor {
      .morning, .after {
        margin: 10px 0;
        .tip {
          display: flex;
          align-items: center;
          span {
            margin-left: 10px;
            color: #7f7f7f;
            font-weight: 900;
          }
        }
        .doc_info {
          margin: 10px 0;
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #ccc;
          .left {
            .info {
              span {
                color: skyblue;
                margin: 10px 5px;
                font-weight: 900;
                font-size: 14px;
              }
            }
            .skill {
              margin: 10px 0;
              color: #7f7f7f;
            }
          }
          .right {
            width: 120px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .money {
              color: #7f7f7f;
              font-weight: 900;
            }
          }
        }
      }
    }
  }
}
</style>