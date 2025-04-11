<script setup lang="ts">
import {
  Document,
  Menu as IconMenu,
  ChatRound,
  InfoFilled,
  Pointer, House
} from '@element-plus/icons-vue'
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
<div class="hospital">
  <div class="menu">
    <div class="title">
      <div class="icon">
        <el-icon><house/></el-icon>
      </div>
      <span>医院信息</span>
    </div>
    <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
    >
      <el-menu-item index="/hospital/register" @click="changeActive('/hospital/register')">
        <el-icon><icon-menu /></el-icon>
        <span>预约挂号</span>
      </el-menu-item>
      <el-menu-item index="/hospital/detail" @click="changeActive('/hospital/detail')">
        <el-icon><document /></el-icon>
        <span>医院详情</span>
      </el-menu-item>
      <el-menu-item index="/hospital/notice" @click="changeActive('/hospital/notice')">
        <el-icon><chat-round /></el-icon>
        <span>预约通知</span>
      </el-menu-item>
      <el-menu-item index="/hospital/close" @click="changeActive('/hospital/close')">
        <el-icon><info-filled /></el-icon>
        <span>停诊信息</span>
      </el-menu-item>
      <el-menu-item index="/hospital/search" @click="changeActive('/hospital/search')">
        <el-icon><pointer /></el-icon>
        <span>查询/取消</span>
      </el-menu-item>
    </el-menu>
  </div>
  <div class="content">
    <router-view></router-view>
  </div>
</div>
</template>

<style scoped lang="scss">
.hospital {
  display: flex;
  .menu {
    flex: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
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
  }
  .content {
    flex: 8;
  }
}
</style>