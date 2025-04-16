<script setup lang="ts">
import type {CascaderProps} from "element-plus";
import {reqCity} from "@/api/user";

const dataProps: CascaderProps = {
  lazy: true,
  async lazyLoad(node, resolve) {
    // node代表当前选中的节点
    let result = await reqCity((node?.data?.id || '86') as string)
    let showData = result.data.map(item => {
      return {
        id: item.id,
        label: item?.name,
        value: item?.value,
        leaf: !item.hasChildren
      }
    })
    resolve(showData)
  }
}

</script>

<template>
  <div class="container">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>添加就诊人</span>
        </div>
      </template>
      <el-divider content-position="left">就诊人信息</el-divider>
      <el-form style="width: 60%; margin:10px auto">
        <el-form-item label="用户姓名">
          <el-input placeholder="请输入用户姓名"></el-input>
        </el-form-item>
        <el-form-item label="证件类型">
          <el-select>
            <el-option value="10" label="身份证"></el-option>
            <el-option value="20" label="户口本"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号码">
          <el-input placeholder="请输入证件号码"></el-input>
        </el-form-item>
        <el-form-item label="用户性别">
          <el-radio-group>
            <el-radio label="0" name = "sex">女</el-radio>
            <el-radio label="1" name = "sex">男</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-date-picker type="date" placeholder="请你选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input placeholder="请输入手机号码"></el-input>
        </el-form-item>
      </el-form>
      <el-divider content-position="left" style="margin: 30px 0">建档信息（完善后部分医院首次就诊不排队建档）</el-divider>
      <el-form style="width: 60%; margin:10px auto">
        <el-form-item label="婚姻状况">
          <el-radio-group>
            <el-radio label="0">未婚</el-radio>
            <el-radio label="1">已婚</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="自费/医保">
          <el-radio-group>
            <el-radio label="0">自费</el-radio>
            <el-radio label="1">医保</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="当前住址">
          <el-cascader :props="dataProps"></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input placeholder="请输入详细地址"></el-input>
        </el-form-item>
      </el-form>
      <el-divider content-position="left" style="margin: 30px 0">联系人信息（选填）</el-divider>
      <!--最后按钮没有label；设置label with可以使按钮居中-->
      <el-form style="width: 60%; margin:10px auto" label-width="80">
        <el-form-item label="用户姓名">
          <el-input placeholder="请输入联系人姓名"></el-input>
        </el-form-item>
        <el-form-item label="证件类型">
          <el-select>
            <el-option value="10" label="身份证"></el-option>
            <el-option value="20" label="户口本"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号码">
          <el-input placeholder="请输入证件号码"></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">提交</el-button>
          <el-button>重写</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.container {
  .btn {
    display:flex;
    justify-content: center;
  }
  .tip {
    font-weight: 900;
    color: #7f7f7f;
    font-size: 1.2rem;
  }
  .box-card {
    margin: 20px 0;
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .user {
      display: flex;
      // 指定可以换行
      flex-wrap: wrap;
      .item {
        transition: all 0.2s;
        // 每三个换一行
        width: 31%;
        margin: 5px 7px;
        &.active {
          transform: scale(1.05)
        }
      }
    }
  }
}
</style>