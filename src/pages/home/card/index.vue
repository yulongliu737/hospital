<script setup lang="ts">
 defineProps(['hospitalInfo'])
</script>

<template>
  <div class="card">
    <el-card class="box-card" shadow="hover">
      <div class = "content">
        <div class="left">
          <div class="hospital_name">
            {{ hospitalInfo.hosname }}
          </div>
          <div class="tip">
            <div class="tip-type">
              <svg t="1743236214671" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4553" width="16" height="16"><path d="M170.666667 938.666667a85.333333 85.333333 0 0 1-85.333334-85.333334v-341.333333a85.333333 85.333333 0 0 1 85.333334-85.333333h85.333333l128-341.333334h42.666667a170.666667 170.666667 0 0 1 170.666666 170.666667v170.666667h232.021334a85.333333 85.333333 0 0 1 82.773333 106.026666l-69.12 276.693334A170.666667 170.666667 0 0 1 677.376 938.666667H170.666667z m85.333333-426.666667H170.666667v341.333333h85.333333v-341.333333z m187.136-341.333333L341.333333 442.154667V853.333333h336.085334a85.333333 85.333333 0 0 0 82.773333-64.64L829.354667 512H512V239.530667c0-35.925333-27.52-65.408-62.592-68.565334L443.136 170.666667z" fill="#000000" p-id="4554"></path></svg>
              <span class="iconfont icon-arrow-right">{{ hospitalInfo.param.hostypeString }}</span>
            </div>
            <div class="tip-time">
              <svg t="1743236303471" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5757" width="16" height="16"><path d="M931.2 518.4c0-233.6-188.8-419.2-419.2-419.2C278.4 99.2 92.8 288 92.8 518.4c0 137.6 67.2 259.2 169.6 336l-57.6 51.2c-9.6 9.6-12.8 25.6-3.2 35.2 9.6 9.6 25.6 12.8 35.2 3.2l70.4-57.6c60.8 35.2 131.2 54.4 208 54.4 80 0 153.6-22.4 214.4-60.8l3.2 3.2 73.6 60.8c9.6 9.6 25.6 6.4 35.2-3.2 9.6-9.6 6.4-25.6-3.2-35.2l-64-54.4c92.8-76.8 156.8-198.4 156.8-332.8zM512 889.6c-204.8 0-371.2-166.4-371.2-371.2S307.2 147.2 512 147.2s371.2 166.4 371.2 371.2S716.8 889.6 512 889.6zM208 96c-9.6-9.6-25.6-9.6-35.2 0L54.4 214.4c-9.6 9.6-9.6 25.6 0 35.2 9.6 9.6 25.6 9.6 35.2 0L208 131.2c9.6-9.6 9.6-25.6 0-35.2zM969.6 211.2L851.2 96c-9.6-9.6-25.6-9.6-35.2 0-9.6 9.6-9.6 25.6 0 35.2l118.4 115.2c9.6 9.6 25.6 9.6 35.2 0 9.6-9.6 9.6-25.6 0-35.2z" fill="" p-id="5758"></path><path d="M707.2 300.8l-144 128s0 3.2-3.2 3.2c-12.8-3.2-22.4-6.4-35.2-6.4-12.8 0-22.4 3.2-32 6.4 0-3.2-3.2-3.2-3.2-6.4l-92.8-83.2c-9.6-9.6-25.6-9.6-35.2 3.2-9.6 9.6-9.6 25.6 3.2 35.2l89.6 80c-16 19.2-28.8 41.6-28.8 70.4 0 54.4 44.8 102.4 102.4 102.4 54.4 0 102.4-44.8 102.4-102.4 0-25.6-9.6-48-25.6-67.2l140.8-124.8c9.6-9.6 9.6-25.6 3.2-35.2-16-9.6-32-9.6-41.6-3.2zM524.8 582.4c-28.8 0-51.2-22.4-51.2-51.2 0-28.8 22.4-51.2 51.2-51.2 28.8 0 51.2 22.4 51.2 51.2 0 25.6-22.4 51.2-51.2 51.2z" fill="" p-id="5759"></path></svg>
              <span class="iconfont icon-arrow-right">每天{{ hospitalInfo.bookingRule?.releaseTime }}放号</span>
            </div>
          </div>
        </div>
        <div class="right">
          <img :src="`data:image/jpeg;base64,${hospitalInfo.logoData}`" alt=""></img>
        </div>
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.card {
  cursor: pointer;
}
.content {
  display: flex;
  justify-content: space-between;
  .right {
    img {
      width: 50px;
      height: 50px;
    }
  }
  .left {
    width: 60%;
    .tip {
      margin-top: 15px;
      display: flex;
      justify-content: space-between;
      color: #7f7f7f;
    }
    .tip-type, .tip-time {
      display: flex;
      align-items: center;
      span {
        margin-left: 4px;
      }
    }
  }
}
</style>