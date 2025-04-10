<script setup lang="ts">
import {User} from '@element-plus/icons-vue'
import Visitor from "@/pages/hospital/register/visitor.vue";
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
      <Visitor v-for="item in 4" :key="item" class="item"></Visitor>
    </div>
  </el-card>
</div>
</template>

<style scoped lang="scss">
.container {
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