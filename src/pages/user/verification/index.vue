<script setup lang="ts">
import {InfoFilled} from "@element-plus/icons-vue";
import {reactive, ref} from "vue";
import type {UserParams} from "@/api/user/type.ts";
import {ElMessage} from "element-plus";
let userForm = reactive<UserParams>({
  certificatesNo: '',
  certificatesType: '',
  certificatesUrl: '',
  name: ''
})
defineOptions({name: "userFrom"})
const exceedHandler = () => {
  ElMessage( {
    type : 'warning',
    message: '只能上传一张图片'
  })
}

const successHandler = (response: any, uploadFile: any, uploadFiles: any) => {
  // 上传的文件信息
  console.log(uploadFile)
  // 上传多个文件的文件信息数组
  console.log(uploadFiles)

  // 收集上传成功图片地址
  // 第一个参数 上传成功的结果
  userForm.certificatesUrl = response.data
}

let dialogVisible = ref<boolean>(false)

// 预览
const previewHandler = ( uploadFile: any) => {
  dialogVisible.value = true
}
</script>

<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>实名信息</span>
      </div>
    </template>
    <div class="infos">
      <div class="tip">
        <el-icon><InfoFilled></InfoFilled></el-icon>
        <span>完成实名认证后才能添加就诊人，正常进行挂号，为了不影响后续步骤，建议提前实名认证。</span>
      </div>
      <div class="description">
        <el-descriptions
            direction="horizontal"
            :column="1"
            border
            v-if="false"
        >
          <el-descriptions-item label="用户姓名" width="20">王二小</el-descriptions-item>
          <el-descriptions-item label="证件类型">身份证</el-descriptions-item>
          <el-descriptions-item label="证件号码">32435345435435435435</el-descriptions-item>
        </el-descriptions>
        <el-form style="width: 40%; margin: 20px auto">
          <el-form-item label="用户姓名">
            <el-input placeholder="请输入用户姓名" v-model="userForm.name"></el-input>
          </el-form-item>
          <el-form-item label="证件类型">
            <el-select placeholder="请选择证件类型" v-model="userForm.certificatesType">
              <el-option label="身份证" value="10"></el-option>
              <el-option label="户口本" value="20"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件号码">
            <el-input placeholder="请输入证件号码" v-model="userForm.certificatesNo"></el-input>
          </el-form-item>
          <el-form-item label="上传证件">
            <el-upload
                list-type="picture-card"
                action="/api/oss/file/fileUpload?fileHost=userAuah"
                :limit="1"
                :on-exceed="exceedHandler"
                :on-success="successHandler"
                :on-preview="previewHandler"
            >
                <img src="../../../assets/images/zpq.png" alt="" style="width: 100%;height: 100%;">
            </el-upload>
            <el-dialog v-model="dialogVisible">
              <img :src="userForm.certificatesUrl" alt="Preview Image" style="width: 100%;height: 100%;" v-if="userForm.certificatesUrl">
            </el-dialog>
          </el-form-item>
          <div class="btns">
            <el-button type="primary">提交</el-button>
            <el-button type="info">重置</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </el-card>
</template>

<style scoped lang="scss">
.box-card {
  .infos {
    display: flex;
    flex-direction: column;
    align-items: center;
    .tip {
      margin: 20px 0;
      color: #7f7f7f;
      display: flex;
      align-items: center;
      span {
        margin-left: 5px;
      }
    }
    .description {
      width: 100%;
      .btns {
        margin-left: 65px;
      }
    }
  }
}
</style>