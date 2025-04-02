<script setup lang="ts">
import {Search} from '@element-plus/icons-vue'
import {ref} from "vue";
import type {HospitalInfo} from "@/api/home/type.ts";
import {reqHospitalInfo} from "@/api/home";
import {useRouter} from "vue-router";

let hosname = ref<string>('')
defineOptions({
  name: "HospitalSearch"
})

const fetchSuggestions = async (_: string, callback: any) => {
  let hosInfos = await getHospitalInfos();
  let showInfoMap = hosInfos?.data.map(item => {
    return {
      value: item.hosname,
      hoscode: item.hoscode
    }
  })
  // 执行此回调函数渲染数据
  callback(showInfoMap)
}

const getHospitalInfos = async () => {
  let res: HospitalInfo = await reqHospitalInfo(hosname.value);
  if (res.code === 200) {
    return res;
  }
}

let $router = useRouter()
// 点击某个推荐项目触发
const goDetail = (item: any) => {
  $router.push({path: '/hospital/register', query: {hoscode: item.hoscode}})
}

</script>

<template>
  <div class="search">
    <div class="search-bar">
      <el-autocomplete
          clearable
          placeholder="请输入医院名称"
          class="search-autocomplete"
          v-model="hosname"
          :trigger-on-focus="false"
          :fetch-suggestions="fetchSuggestions"
          @select="goDetail"
      />
      <el-button type="primary" :icon="Search" class="searchBtn">搜索</el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.search {
  width: 80%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;

  .search-bar {
    width: 1000px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;

    .searchBtn {
      margin-left: 10px;
    }
  }
}
</style>