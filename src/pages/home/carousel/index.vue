<script setup lang="ts">

</script>

<template>
  <div class="home">
    <el-carousel height="350px">
      <el-carousel-item v-for="item in 4" :key="item">
        <img src="../../../assets/images/banner.png">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style scoped lang="scss">
img {
  width: 100%;
  height: 350px;
}
</style>