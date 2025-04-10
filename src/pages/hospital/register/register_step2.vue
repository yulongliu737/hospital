<script setup lang="ts">
import {User} from '@element-plus/icons-vue'
import Visitor from "@/pages/hospital/register/visitor.vue";
import {onMounted, ref} from "vue";
import {reqPatient} from "@/api/hospital";
import type {UserArr} from "@/api/hospital/type.ts";
onMounted(() => {
  fetchUserData()
})

let patients = ref<UserArr>([])

// 获取就诊人信息
const fetchUserData = async () => {
  let userResult = await reqPatient();
  if (userResult.code === 200) {
    patients.value = userResult.data;
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
      <Visitor v-for="item in patients" :key="item.id" class="item" :patient="item"></Visitor>
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
      <el-descriptions-item label="就诊日期：">{{}}</el-descriptions-item>
      <el-descriptions-item label="就诊医院：">{{}}</el-descriptions-item>
      <el-descriptions-item label="就诊科室：">{{}}</el-descriptions-item>
      <el-descriptions-item label="医生姓名：">{{}}</el-descriptions-item>
      <el-descriptions-item label="医生职称：">{{}}</el-descriptions-item>
      <el-descriptions-item label="医生专长：">{{}}</el-descriptions-item>
      <el-descriptions-item label="医事服务费：："><span style="color:red">100</span></el-descriptions-item>
    </el-descriptions>
  </el-card>
  <div class="btn"><el-button type="primary" >确认挂号</el-button></div>
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
        // 每三个换一行
        width: 31%;
        margin: 5px 7px;
      }
    }
  }
}
</style>