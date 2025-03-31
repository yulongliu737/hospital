<script setup lang="ts">
</script>

<template>
  <div class="container">
    <HospitalTop></HospitalTop>
    <div class="top-section">
      <div class="input-container" id="inputContainer">
        <router-view></router-view>
      </div>
    </div>
    <div class="bottom-section">
      <HospitalBottom></HospitalBottom>
    </div>
  </div>
</template>

<style scoped>
.container {
  min-height: 100%;
  position: relative;
}

.top-section {
  background-color: #ffffff;
  /* 为下部区域留出空间 */
  padding: 20px 20px 70px;
}

.bottom-section {
  background-color: gray;
  height: 50px;
  width: 100%;
  position: absolute;
  bottom: 0;
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