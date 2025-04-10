<script setup lang="ts">
import {Edit} from '@element-plus/icons-vue'
defineProps(['patient'])
</script>

<template>
<div class="container">
  <div class="top">
    <div class="left">
      <div class="payMethod">{{patient.isInsure === 0 ? "医保": "自费"}}</div>
      <div class="username">{{ patient.name }}</div>
    </div>
    <div class="right">
      <el-button type="primary" :icon="Edit" circle />
    </div>
  </div>
  <div class="bottom_msg">
    <p>证件类型：{{ patient.param.certificatesTypeString }}</p>
    <p>证件号码：{{ patient.certificatesNo }}</p>
    <p>用户性别：{{ patient.sex === 1 ? "男" : "女" }}</p>
    <p>出身日期：{{ patient.birthdate }}</p>
    <p>手机号码：{{ patient.phone }}</p>
    <p>婚姻状况：{{ patient.isMarry === 0 ? "未婚" : "已婚" }}</p>
    <p>当前住址：{{ patient.address }}</p>
    <p>详细地址：{{ patient.param.fullAddress }}</p>
  </div>
</div>
</template>

<style scoped lang="scss">
.container {
  // 阴影效果
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.12);
  .top {
    height: 60px;
    background-color: #f5f5f5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      margin-left: 10px;
      .username {
        margin-left: 10px;
      }
      .payMethod {
        background-color: white;
        width: 40px;
        height: 19px;
        text-align: center;
        // 医保加上圆角
        border-radius: 7px;
      }
    }
    .right {
      margin-right: 20px;
    }
  }
  .bottom_msg {
    padding: 20px;
    p {
      height: 30px;
    }
  }
}
</style>