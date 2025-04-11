<script setup lang="ts">

import {House, Avatar,  User, Memo, Postcard, Comment} from "@element-plus/icons-vue";
import {useRoute, useRouter} from "vue-router";
import useDetailStore from "@/store/modules/hospitalDetail.ts";
import {onMounted} from "vue";
let $router = useRouter()
const changeActive = (path: string): void => {
  $router.push({path, query: {hoscode: $route.query.hoscode}})
}

let $route = useRoute()

let detailStore = useDetailStore()
onMounted(() => {
  detailStore.getHospital($route.query.hoscode as string)
  detailStore.getDepartment($route.query.hoscode as string)
})
</script>

<template>
  <div class="user">
    <div class="menu">
      <div class="title">
        <div class="icon">
          <el-icon><house/></el-icon>
        </div>
        <span>会员中心</span>
      </div>
      <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
      >
        <el-menu-item index="/user/verification" @click="changeActive('/user/verification')">
          <el-icon><postcard/></el-icon>
          <span>实名认证</span>
        </el-menu-item>
        <el-menu-item index="/user/order" @click="changeActive('/user/order')">
          <el-icon><memo /></el-icon>
          <span>挂号订单</span>
        </el-menu-item>
        <el-menu-item index="/user/patient" @click="changeActive('/user/patient')">
          <el-icon><user /></el-icon>
          <span>就诊人管理</span>
        </el-menu-item>
        <el-menu-item index="/user/account" @click="changeActive('/user/account')">
          <el-icon><avatar /></el-icon>
          <span>账号信息</span>
        </el-menu-item>
        <el-menu-item index="/user/feedback" @click="changeActive('/user/feedback')">
          <el-icon><comment /></el-icon>
          <span>意见反馈</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped lang="scss">
.user {
  display: flex;
  .menu {
    .title {
      color:#cccccc;
      font-size: 14px;
      display: flex;
      align-items: center;
      span {
        margin-left: 10px
      }
      margin-bottom: 20px;
    }
    flex: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .content {
    flex: 8;
  }
}
</style>