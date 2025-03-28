<script setup lang="ts">

</script>

<template>
  <div class="container">
    <!-- 顶部全局组件 -->
    <HospitalTop></HospitalTop>
    <div class="content">content</div>
    <HospitalBottom></HospitalBottom>
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
    height: 800px;
    background-color: #55a6fe;
  }
}
</style>