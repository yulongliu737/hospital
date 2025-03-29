<script setup lang="ts">

</script>

<template>
  <div class="container">
    <!-- 顶部全局组件 -->
    <HospitalTop></HospitalTop>
    <div class="content">
      <router-view></router-view>
    </div>
    <div class="bottom">
      <HospitalBottom></HospitalBottom>
    </div>
    </div>
</template>

<style scoped>
.container{
  display: flex;
  flex-direction: column;
  align-items: center;
  .content {
    margin-top: 80px;
    width: 1600px;
    height: 740px;
    background-color: #ffffff;
    margin-bottom: 10px;
  }
  .bottom {
    margin-top: 50px;
    width: 100%;
  }
}
</style>