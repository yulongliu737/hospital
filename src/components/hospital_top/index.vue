<script setup lang="ts">
import {useRouter} from "vue-router";
let $router = useRouter()
const goHome = () => {
  $router.push({path:'/home'})
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
        <p class="login">登录/注册</p>
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