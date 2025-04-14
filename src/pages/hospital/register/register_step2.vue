<script setup lang="ts">
import {User} from '@element-plus/icons-vue'
import Visitor from "@/pages/hospital/register/visitor.vue";
import {onMounted, ref} from "vue";
import {reqDocDetail, reqPatient} from "@/api/hospital";
import type {UserArr} from "@/api/hospital/type.ts";
import {useRoute, useRouter} from "vue-router";
import {reqSubmitOrder} from "@/api/user";
import type {SubmitOrder} from "@/api/user/type.ts";

onMounted(() => {
  fetchUserData()
})

let $route = useRoute();
let patients = ref<UserArr>([])
let doctorDetail = ref<any>()
let checkedItem = ref<any>()

// 获取就诊人信息
const fetchUserData = async () => {
  let userResult = await reqPatient();
  if (userResult.code === 200) {
    patients.value = userResult.data;
    let obj = {
      id: "234343543",
      createTime: "2023-06-02",
      updateTime: "2025-08-03",
      isDeleted: 1,
      param: {
        certificatesTypeString: "23423978432432432",
        contactsCertificatesTypeString: "type",
        cityString: "上海",
        fullAddress: "虹桥703",
        districtString: "",
        provinceString: "",
      },
      userId:1213,
      name: "打桩",
      certificatesType: "",
      certificatesNo: "2131324324324",
      sex:0,
      birthdate: "2025-09-02",
      phone: "156234234",
      isMarry:0,
      provinceCode: "",
      cityCode: "",
      districtCode: "",
      address: "大学路304",
      contactsName: "",
      contactsCertificatesType: "",
      contactsCertificatesNo: "",
      contactsPhone: "",
      isInsure:0,
      cardNo: "324324",
      status:"0"
    }
    // 添加打桩数据
    patients.value.push(obj)
    patients.value.push(obj)
    patients.value.push(obj)
    patients.value.push(obj)
  }
  let docDetail = await reqDocDetail($route.query.docId as string)
  if (docDetail.code === 200) {
    doctorDetail.value = docDetail.data;
  } else {
    // 添加打桩数据
    doctorDetail.value = {
      "id": "6225753136a9ba1be763dc18",
      "workDate":"2025-04-10",
      "param": {
        "hosname": "北京人民医院",
        "depname": "多发性硬化专科门诊"
      },
      "docname": "邵逸夫",
      "title": "副主任医师",
      "skill": "内分泌代谢性疾病",
      "amount": 100,
      "hoscode": "1000_0"
    }
  }
}

let clickedItemIndex = ref<number>(-1)
const changeIndex = (index: number, item: any) => {
  clickedItemIndex.value = index
  checkedItem.value = item
}

let orderId = ref<number>()
let $router = useRouter()

const submitOrder = async() => {
  let hoscode = doctorDetail.value.hoscode
  let scheduleId = doctorDetail.value.id
  let patientId = parseInt(patients.value[clickedItemIndex.value].id)
  let submitOrderResult : SubmitOrder = await reqSubmitOrder(hoscode, scheduleId, patientId)
  if (submitOrderResult.code === 200) {
    orderId.value = submitOrderResult.data
  } else {
    // 接口调用异常使用打桩数据
    orderId.value = Math.floor(Math.random() * 1000) + 1
    // 打桩数据
    orderId.value = 431
    $router.push({path: '/user/order', query: {orderId: orderId.value}})
  }
}
</script>

<template>
<div class="container">
  <h1 class="tip">确认挂号信息</h1>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>请选择就诊人</span>
        <el-button class="button" type="primary" :icon="User">添加就诊人</el-button>
      </div>
    </template>
    <div class="user">
      <Visitor
          v-for="(item, index) in patients"
          :key="item.id"
          class="item"
          :patient="item"
          :isSelected = "clickedItemIndex === index"
          @click = "changeIndex(index, item)"
          :class="{active: index === clickedItemIndex}"
          style="cursor: pointer;"
      ></Visitor>
    </div>
  </el-card>
  <el-card class="box-card">
    <template #header>
      <div class="registered-letter">
        <span>挂号信息</span>
      </div>
    </template>
    <el-descriptions
        direction="horizontal"
        :column="2"
        border
    >
      <el-descriptions-item label="就诊日期：">{{doctorDetail?.workDate}}</el-descriptions-item>
      <el-descriptions-item label="就诊医院：">{{doctorDetail?.param?.hosname}}</el-descriptions-item>
      <el-descriptions-item label="就诊科室：">{{doctorDetail?.param?.depname}}</el-descriptions-item>
      <el-descriptions-item label="医生姓名：">{{doctorDetail?.docname}}</el-descriptions-item>
      <el-descriptions-item label="医生职称：">{{doctorDetail?.title}}</el-descriptions-item>
      <el-descriptions-item label="医生专长：">{{doctorDetail?.skill}}</el-descriptions-item>
      <el-descriptions-item label="医事服务费：："><span style="color:red">{{doctorDetail?.amount}}</span></el-descriptions-item>
    </el-descriptions>
  </el-card>
  <div class="btn"><el-button type="primary" :disabled="clickedItemIndex === -1" @click="submitOrder()">确认挂号</el-button></div>
</div>
</template>

<style scoped lang="scss">
.container {
  .btn {
    display:flex;
    justify-content: center;
  }
  .tip {
    font-weight: 900;
    color: #7f7f7f;
    font-size: 1.2rem;
  }
  .box-card {
    margin: 20px 0;
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .user {
      display: flex;
      // 指定可以换行
      flex-wrap: wrap;
      .item {
        transition: all 0.2s;
        // 每三个换一行
        width: 31%;
        margin: 5px 7px;
        &.active {
          transform: scale(1.05)
        }
      }
    }
  }
}
</style>