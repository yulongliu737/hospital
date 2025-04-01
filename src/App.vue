<script setup lang="ts">
</script>

<template>
  <div class="container">
    <HospitalTop></HospitalTop>
    <div class="content-wrapper">
      <div class="top-section">
        <div class="input-container" id="inputContainer">
          <router-view></router-view>
        </div>
      </div>
      <div class="bottom-section">
        <HospitalBottom></HospitalBottom>
      </div>

    </div>
  </div>
</template>

<style scoped>
.container {
  min-height: 100vh; /* 使用视窗高度单位 */
  display: flex;
  flex-direction: column;
}

.content-wrapper {
  flex: 1; /* 占据剩余空间 */
  position: relative;
  padding-bottom: 70px; /* 为底部区域预留空间 */
}

.top-section {
  background-color: #ffffff;
  padding: 20px;
}

.bottom-section {
  background-color: gray;
  height: 70px;
  width: 100%;
  position: absolute; /* 改为absolute */
  bottom: 0;
  left: 0;
}

.input-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

body, html {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: Arial, sans-serif;
}
</style>