<script setup lang="ts">
import {
  Document,
  Menu as IconMenu,
  ChatRound,
  InfoFilled,
  Pointer
} from '@element-plus/icons-vue'
import {useRoute, useRouter} from "vue-router";
import useDetailStore from "@/store/modules/hospitalDetail.ts";
import {onMounted} from "vue";
let $router = useRouter()
const changeActive = (active: string): void => {
  $router.push({path:active})
}

let $route = useRoute()

let detailStore = useDetailStore()
onMounted(() => {
  detailStore.getHospital($route.query.hoscode)
})
</script>

<template>
<div class="hospital">
  <div class="menu">
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
  }
  .content {
    flex: 8;
  }
}
</style>