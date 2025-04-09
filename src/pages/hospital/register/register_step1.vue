<script setup lang="ts">

</script>

<template>
<div class="wrap">
  <div class="top">
    <div class="hosname">北京xx医院</div>
    <div class="line"></div>
    <div>专科</div>
    <div class="dot">.</div>
    <div class="hosdeparment">多发性硬化专科门诊</div>
  </div>
  <div class="center">
    <h1>2024年4月9日</h1>
    <div class="container">
      <div class="item" v-for="item in 6" :key = "item">
        <div class="top_item">123</div>
        <div class="bottom">345</div>
      </div>
    </div>
    <el-pagination layout="prev, pager, next" :total="50" />
  </div>
</div>
</template>

<style scoped lang="scss">
.wrap {
  .top {
    display: flex;
    color: #7f7f7f;
    .line {
      width: 1px;
      height: 19px;
      background: #7f7f7f;
      margin: 0 8px;
    }
    .dot {
      margin: 0 6px;
      color: #7f7f7f;
    }
  }
  .center {
    margin: 20px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    h1 {
      font-weight: 600;
      font-size: 17px;
      margin: 10px 0;
    }
    .container {
      width: 100%;
      display: flex;
      .item {
        flex: 1;
        border: 1px solid skyblue;
        margin: 10px 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        .top_item {
          background: #e8f2ff;
          height: 28px;
          width: 100%;
          text-align: center;
          line-height: 28px;
        }
        .bottom {
          width: 100%;
          height: 60px;
          text-align: center;
          line-height: 60px;
        }
      }
    }
  }
}
</style>