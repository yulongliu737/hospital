<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import type {OrderInfo, OrderInfoResponse} from "@/api/user/type.ts";
import {reqCancelOrder, reqOrderInfo} from "@/api/user";
import {InfoFilled} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";

let $route = useRoute()
onMounted(() => {
  getOrderDetail()
})

let orderDetail = ref<OrderInfo>()
const getOrderDetail = async() => {
  let orderResult : OrderInfoResponse = await reqOrderInfo($route.query.orderId as string)
  orderDetail.value = orderResult.data
  // 打桩数据
  orderDetail.value.orderStatus = 0
}

let confirmEvent = async() => {
  try {
    await reqCancelOrder($route.query.orderId as string)
    await getOrderDetail()
  } catch (e) {
    ElMessage({
      type: 'error',
      message: '取消预约失败'
    })
  }
}

let cancelEvent = () => {
  return;
}

let showPayDialog = () => {
  showPayDialogRef.value = true
}

let showPayDialogRef = ref<boolean>(false)
</script>

<template>
  <el-card class="box-card">
    <template #header>
      <div class="detail_register">
        挂号详情
      </div>
    </template>
    <div class="top">
      <el-tag class="ml-2" type="success" v-show="orderDetail?.orderStatus === 0">√ {{orderDetail?.param.orderStatusString}}</el-tag>
      <el-tag class="ml-2" type="danger" v-show="orderDetail?.orderStatus !== 0">× {{orderDetail?.param.orderStatusString}}</el-tag>
      <div class="right">
        <img src="../../../../assets/images/code1.png" alt="">
        <div>
          <span>微信关注</span>
          <svg t="1744364769037" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4381" width="16" height="16"><path d="M183.379592 699.559184c-4.179592 0-8.359184-1.044898-11.493878-3.657143-6.269388-4.702041-9.404082-12.016327-7.836734-19.330612l13.061224-77.322449C136.881633 553.273469 114.938776 496.326531 114.938776 437.289796 114.938776 292.571429 246.073469 175.020408 408.032653 175.020408c76.8 0 149.420408 26.644898 204.8 74.710204 55.379592 48.587755 86.726531 113.893878 88.293878 183.379592 0 5.746939-2.089796 10.971429-6.269388 14.628572s-9.404082 5.746939-15.151021 5.746938c-5.22449-0.522449-9.404082-0.522449-13.583673-0.522449-112.326531 0-203.232653 79.934694-203.232653 178.677551 0 13.583673 1.567347 27.167347 5.22449 40.751021 1.567347 5.746939 0.522449 11.493878-2.612245 16.195918-3.134694 4.702041-8.359184 7.836735-14.106123 8.881633-14.106122 2.089796-28.734694 3.134694-43.363265 3.134694-52.767347 0-104.489796-12.538776-149.420408-36.571429l-65.828572 34.481633c-3.134694 0-6.269388 1.044898-9.404081 1.044898z" fill="#0B9682" p-id="4382"></path><path d="M303.542857 352.653061m-35.004081 0a35.004082 35.004082 0 1 0 70.008163 0 35.004082 35.004082 0 1 0-70.008163 0Z" fill="#DCFFFA" p-id="4383"></path><path d="M512 352.653061m-35.004082 0a35.004082 35.004082 0 1 0 70.008164 0 35.004082 35.004082 0 1 0-70.008164 0Z" fill="#DCFFFA" p-id="4384"></path><path d="M849.502041 849.502041c-3.134694 0-6.269388-0.522449-9.404082-2.089796l-52.244898-27.167347c-37.093878 19.330612-78.889796 29.779592-122.253061 29.779592-134.269388 0-242.938776-98.220408-242.938776-218.383674S531.853061 412.734694 665.6 412.734694 909.061224 510.955102 909.061224 631.118367c0 48.065306-17.763265 95.085714-50.677551 133.22449l10.44898 61.64898c1.044898 7.314286-1.567347 15.15102-7.836735 19.330612-3.134694 3.134694-7.314286 4.179592-11.493877 4.179592z" fill="#16C4AF" p-id="4385"></path><path d="M576.261224 575.738776m-29.779591 0a29.779592 29.779592 0 1 0 59.559183 0 29.779592 29.779592 0 1 0-59.559183 0Z" fill="#DCFFFA" p-id="4386"></path><path d="M755.461224 575.738776m-29.779591 0a29.779592 29.779592 0 1 0 59.559183 0 29.779592 29.779592 0 1 0-59.559183 0Z" fill="#DCFFFA" p-id="4387"></path></svg>
          <span>“北京114预约挂号”</span>
          <p class = "register"> 快速预约挂号</p>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="bottom">
        <div class="left">
          <el-descriptions
              direction="horizontal"
              :column="1"
              border
          >
            <el-descriptions-item label="就诊人信息">{{orderDetail?.patientName}}</el-descriptions-item>
            <el-descriptions-item label="就诊日期">{{orderDetail?.reserveDate}}</el-descriptions-item>
            <el-descriptions-item label="就诊医院">{{orderDetail?.hosname}}</el-descriptions-item>
            <el-descriptions-item label="就诊科室">{{orderDetail?.depname}}</el-descriptions-item>
            <el-descriptions-item label="医生职称">{{orderDetail?.title}}</el-descriptions-item>
            <el-descriptions-item label="医事服务费"><span style="color:red">{{orderDetail?.amount}} 元</span></el-descriptions-item>
            <el-descriptions-item label="挂号单号">{{orderDetail?.outTradeNo}}</el-descriptions-item>
            <el-descriptions-item label="挂号时间">{{orderDetail?.createTime}}</el-descriptions-item>
          </el-descriptions>
        </div>
        <div class="right">
          <div class="tip">
            <span>注意事项</span>
          </div>
          <div class="tipDetail">
            <p>1.请确认就诊人信息是否准确，若填写错误将无法取号就诊，损失由本人承担；</p>
            <p style="color:red">2.【取号】就诊当天需在{{orderDetail?.fetchTime}}取号，未取号视为爽约，该号不退不换；</p>
            <p>3.【退号】在{{orderDetail?.quitTime}} 可在线退号，预期将不可办理退号退费；</p>
            <p>4.北京114预约挂号支持自费患者使用身份证预约，同时支持北京市医保患者使用北京社保卡在平台预约挂号。请于就诊当日，携带预约挂号所使用的有效身份证件到院取号。</p>
            <p>5.请注意北京市医保患者在住院期间不能使用社保卡在门诊取号。</p>
          </div>
        </div>
      </div>
      <div class="btn" v-if="orderDetail?.orderStatus === 0 || orderDetail?.orderStatus === 1">
        <el-popconfirm
            confirm-button-text="确定"
            cancel-button-text="关闭"
            :icon="InfoFilled"
            icon-color="#626AEF"
            title="确认要取消预约吗?"
            @confirm="confirmEvent"
            @cancel="cancelEvent"
        >
          <template #reference>
            <el-button>取消预约</el-button>
          </template>
        </el-popconfirm>
        <el-button type="primary" v-if="orderDetail?.orderStatus === 0" @click="showPayDialog()">支付</el-button>
      </div>
    </template>

    <el-dialog
        v-model="showPayDialogRef"
        title="微信支付"
        width="400px"
    >
      <div class="payDialog">
        <img src = "../../../../assets/images/code1.png" alt="">
        <p>请使用微信</p>
        <p>扫码支付</p>
      </div>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="showPayDialogRef = false">关闭窗口</el-button>
      </span>
      </template>
    </el-dialog>
  </el-card>
</template>

<style scoped lang="scss">
.box-card {
  .detail_register {
    color: #7f7f7f;
    font-weight: bold;
  }
  .top {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .right {
      color: #7f7f7f;
      font-size: 14px;
      display: flex;
      img {
        width: 35px;
        height: 35px;
        margin: 0 10px;
      }
      .register {
        margin-top: 2px;
      }
    }
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    .left {
      flex: 5;
      margin: 10px 10px;
    }
    .right {
      border-radius: 2%;
      border: #ece8e8 1px solid;
      flex: 5;
      margin: 10px 10px;
      .tip {
        padding: 20px;
        border-bottom: #ece8e8 1px solid;
      }
      .tipDetail {
        padding: 5px;
        p {
          margin-left: 10px;
          margin-top: 7px;
          line-height: 20px;
        }
      }
    }
  }
  .btn {
    display: flex;
    justify-content: center;
  }
}
::v-deep(.el-dialog__body) {
  border-top: #e6e2e2 1px solid;
  border-bottom: #e6e2e2 1px solid;
}
.payDialog {
  display: flex;
  flex-direction: column;
  margin: 25px;
  align-items: center;
  p {
    margin-top: 10px;
  }
}
</style>