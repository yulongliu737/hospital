<script setup lang="ts">
import {useRouter} from "vue-router";
import useUserStore from "@/store/modules/user.ts";
import { ArrowDown } from '@element-plus/icons-vue'
let $router = useRouter()
const goHome = () => {
  $router.push({path:'/home'})
}
let userStore = useUserStore();
const showLoginDialog = () => {
  userStore.visible = true;
}
const logOut = () => {
  localStorage.removeItem("USER_INFO");
  Object.assign(userStore.loginResult, {name: '', token: ''})
  goHome()
}
</script>

<template>
  <div class="top">
    <div class="content">
      <div class="top-left" @click="goHome" style="cursor: pointer;">
        <img src="../../assets/images/logo.png">
        <p>尚医通 预约挂号统一平台</p>
      </div>
      <div class="top-right">
        <p class="help">帮助中心</p>
        <p class="login" @click="showLoginDialog" style="cursor:pointer" v-show="!userStore.loginResult?.name">登录/注册</p>
        <el-dropdown v-show="userStore.loginResult?.name">
          <span class="el-dropdown-link">
            {{userStore.loginResult?.name}}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>实名认证</el-dropdown-item>
              <el-dropdown-item>挂号订单</el-dropdown-item>
              <el-dropdown-item>就诊人管理</el-dropdown-item>
              <el-dropdown-item @click="logOut">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<style scoped>
.top {
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 70px;
  background-color: white;
  display: flex;
  justify-content: center;
  .content {
    width: 1600px;
    height: 70px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    .top-left {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 50px;
        height: 50px;
        margin-right: 10px;
      }
      p {
        font-size: 20px;
        color: #55a6fe;
      }
    }
    .top-right {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #bbb;
      p {
        margin-right: 10px;
      }
    }
  }
}
</style>