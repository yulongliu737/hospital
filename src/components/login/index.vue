<script setup lang="ts">
import useUserStore from "@/store/modules/user.ts";
import {User, Lock} from '@element-plus/icons-vue'
import {computed, reactive, ref, watch} from "vue";
import {reqUserCode} from "@/api/home";
import type {CrCode} from "@/api/home/type.ts";
import {ElMessage} from "element-plus";
import type {ValidateError} from "@/store/modules/interface";

defineOptions({
  name: "Login"
})
let scene = ref<boolean>(true);
const changeLoginWay = () => {
  scene.value = !scene.value;
}
let loginParams = reactive({
  phone: '',
  code: ''
})
const regex = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/;
// 是否合法手机号
let isPhone = computed(() => {
  return regex.test(loginParams.phone);
})

// 验证码内容
// let crCode = ref<string>('')
let getCode = async () => {
  let res: CrCode = await reqUserCode(loginParams.phone);
  if (res.code === 200) {
    loginParams.code = res.data;
    showGetCrCode.value = false;
  }
}
// 是否展示倒计时
let showGetCrCode = ref<boolean>(true)
let remainTime = ref<number>(5)

watch(
    showGetCrCode,
    (newValue) => {
      if (!newValue) {
        remainTime.value = 5;
        let timer = setInterval(() => {
          remainTime.value--;
          if (remainTime.value <= 0) {
            showGetCrCode.value = true;
            clearInterval(timer)
          }
        }, 1000)
      }
    },
    {
      immediate: true, // 立即执行一次
    }
)
let userStore = useUserStore();
let checkForm = ref<any>()
const login = async () => {
  try {
    await checkForm.value.validate();
    await userStore.userLogin(loginParams);
    userStore.visible = false;
    ElMessage({
      type: "success",
      message: "登录成功",
    })
  } catch (error) {
    if ((error as ValidateError).hasOwnProperty('code')) {
      // 可以做弹窗提示，但没必要做多余提示
      // let msg = (error as ValidateError)?.code[0]?.message;
      // ElMessage({
      //   type: "error",
      //   message: msg,
      // })
    } else {
      ElMessage({
        type: "error",
        message: (error as Error).message,
      })
    }
  }
}

const rule = {
  // 简单校验
  // phone: [{
  //   required: true,
  //   message: '手机号为11位',
  //   trigger: "change",
  //   min:11
  // }],
  // code: [{
  //   required: true,
  //   message: '验证码为6位',
  //   trigger: "blur",
  //   min:6
  // }]
  // 自定义规则
  phone: [
    {
      trigger: "change",
      validator(_: any, value: any, callback: any) {
        if (regex.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确格式的手机号"));
        }
      }
    }
  ],
  code: [
    {
      trigger: "blur",
      validator(_: any, value: any, callback: any) {
        const codeReg = /^\d{6}$/;
        if (codeReg.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的验证码"));
        }
      }
    }
  ]
}

const clearData = () => {
  Object.assign(loginParams, {phone:'', code:''});
  // 清除表单校验
  checkForm.value.resetFields();
  userStore.visible = false;
}
</script>

<template>
  <div class="login_container">
    <el-dialog v-model="userStore.visible" title="用户登录" @close="clearData">
      <el-row>
        <el-col :span="12">
          <div class="weChatLogin" v-show="!scene">
            <p @click="changeLoginWay()" style="cursor: pointer">微信扫码登录</p>
          </div>
          <div class="login" v-show="scene">
            <el-form :model="loginParams" :rules="rule" ref="checkForm">
              <el-form-item prop="phone">
                <el-input placeholder="请输入手机号码" :prefix-icon="User" v-model="loginParams.phone"></el-input>
              </el-form-item>
              <el-form-item prop="code">
                <el-input placeholder="请输入手机验证码" :prefix-icon="Lock" v-model="loginParams.code"></el-input>
              </el-form-item>
            </el-form>
            <el-button :disabled="!isPhone || !showGetCrCode" @click="getCode">
              <span v-show="showGetCrCode">获取验证码</span>
              <span v-show="!showGetCrCode">获取验证码({{ remainTime }}s)</span>
            </el-button>
            <div class="bottom">
              <el-button @click="login" style="width: 90%;margin-top: 10px" type="primary"
                         :disabled="!isPhone || loginParams.code?.length < 6">用户登录
              </el-button>
              <p @click="changeLoginWay()" style="cursor: pointer">微信扫码登录</p>
              <svg @click="changeLoginWay()" style="cursor: pointer" t="1743651988253" class="icon"
                   viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4398" width="32"
                   height="32">
                <path
                    d="M337.387283 341.82659c-17.757225 0-35.514451 11.83815-35.514451 29.595375s17.757225 29.595376 35.514451 29.595376 29.595376-11.83815 29.595376-29.595376c0-18.49711-11.83815-29.595376-29.595376-29.595375zM577.849711 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763zM501.641618 401.017341c17.757225 0 29.595376-12.578035 29.595376-29.595376 0-17.757225-11.83815-29.595376-29.595376-29.595375s-35.514451 11.83815-35.51445 29.595375 17.757225 29.595376 35.51445 29.595376zM706.589595 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763z"
                    fill="#28C445" p-id="4399"></path>
                <path
                    d="M510.520231 2.959538C228.624277 2.959538 0 231.583815 0 513.479769s228.624277 510.520231 510.520231 510.520231 510.520231-228.624277 510.520231-510.520231-228.624277-510.520231-510.520231-510.520231zM413.595376 644.439306c-29.595376 0-53.271676-5.919075-81.387284-12.578034l-81.387283 41.433526 22.936416-71.768786c-58.450867-41.433526-93.965318-95.445087-93.965317-159.815029 0-113.202312 105.803468-201.988439 233.803468-201.98844 114.682081 0 216.046243 71.028902 236.023121 166.473989-7.398844-0.739884-14.797688-1.479769-22.196532-1.479769-110.982659 1.479769-198.289017 85.086705-198.289017 188.67052 0 17.017341 2.959538 33.294798 7.398844 49.572255-7.398844 0.739884-15.537572 1.479769-22.936416 1.479768z m346.265896 82.867052l17.757225 59.190752-63.630058-35.514451c-22.936416 5.919075-46.612717 11.83815-70.289017 11.83815-111.722543 0-199.768786-76.947977-199.768786-172.393063-0.739884-94.705202 87.306358-171.653179 198.289017-171.65318 105.803468 0 199.028902 77.687861 199.028902 172.393064 0 53.271676-34.774566 100.624277-81.387283 136.138728z"
                    fill="#28C445" p-id="4400"></path>
              </svg>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="rightContent">
            <div class="top">
              <div class="item">
                <img src="../../assets/images/code1.png">
                <svg t="1743651988253" class="icon" viewBox="0 0 1024 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg" p-id="4398" width="16" height="16">
                  <path
                      d="M337.387283 341.82659c-17.757225 0-35.514451 11.83815-35.514451 29.595375s17.757225 29.595376 35.514451 29.595376 29.595376-11.83815 29.595376-29.595376c0-18.49711-11.83815-29.595376-29.595376-29.595375zM577.849711 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763zM501.641618 401.017341c17.757225 0 29.595376-12.578035 29.595376-29.595376 0-17.757225-11.83815-29.595376-29.595376-29.595375s-35.514451 11.83815-35.51445 29.595375 17.757225 29.595376 35.51445 29.595376zM706.589595 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763z"
                      fill="#515151" p-id="4399"></path>
                  <path
                      d="M510.520231 2.959538C228.624277 2.959538 0 231.583815 0 513.479769s228.624277 510.520231 510.520231 510.520231 510.520231-228.624277 510.520231-510.520231-228.624277-510.520231-510.520231-510.520231zM413.595376 644.439306c-29.595376 0-53.271676-5.919075-81.387284-12.578034l-81.387283 41.433526 22.936416-71.768786c-58.450867-41.433526-93.965318-95.445087-93.965317-159.815029 0-113.202312 105.803468-201.988439 233.803468-201.98844 114.682081 0 216.046243 71.028902 236.023121 166.473989-7.398844-0.739884-14.797688-1.479769-22.196532-1.479769-110.982659 1.479769-198.289017 85.086705-198.289017 188.67052 0 17.017341 2.959538 33.294798 7.398844 49.572255-7.398844 0.739884-15.537572 1.479769-22.936416 1.479768z m346.265896 82.867052l17.757225 59.190752-63.630058-35.514451c-22.936416 5.919075-46.612717 11.83815-70.289017 11.83815-111.722543 0-199.768786-76.947977-199.768786-172.393063-0.739884-94.705202 87.306358-171.653179 198.289017-171.65318 105.803468 0 199.028902 77.687861 199.028902 172.393064 0 53.271676-34.774566 100.624277-81.387283 136.138728z"
                      fill="#515151" p-id="4400"></path>
                </svg>
                <p>微信扫一扫关注</p>
                <p>"快速预约挂号"</p>
              </div>
              <div class="download">
                <img src="../../assets/images/gxfc.png">
                <svg t="1743653298898" class="icon" viewBox="0 0 1024 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg" p-id="5687" width="16" height="16">
                  <path
                      d="M287.271 790.209v30.108c0 19.872 5.903 35.711 16.705 46.509l0.012 0.008c10.798 10.806 26.639 16.709 46.51 16.709h321.759c63.51 0 63.351-53.948 63.249-91.684l-0.004-1.65H287.271z m448.211-525.225H287.271v476.603h448.211V264.984zM304.12 158.808c-10.106 10.109-16.849 23.541-16.849 36.912v20.64h448.183c-0.378-20.569-4.594-40.674-14.563-54.802-8.415-11.916-21.066-19.6-39.17-19.6H341.03c-13.369 0.001-26.801 6.744-36.91 16.85z m-60.743 675.706V190.99c0-28.151 13.255-51.858 33.678-68.887 21.895-18.239 52.068-28.771 82.906-28.771h302.832c31.576 0 61.396 11.045 82.955 29.909 20.555 17.985 33.629 43.079 33.629 72.478v634.062c0 16.14-4.362 30.474-11.091 42.833-8.257 15.147-20.103 27.303-31.856 36.125-11.651 8.766-25.136 14.636-40.593 18.311-15.322 3.627-32.597 5.114-51.968 5.114H378.883c-18.855 0-36.203-1.39-51.846-4.813-15.755-3.439-29.804-8.96-41.917-17.196-11.45-7.765-22.695-19.481-30.596-33.8-6.781-12.269-11.147-26.498-11.147-41.841z m256.038 29.19c-10.828-4.691-19.449-15.066-19.449-29.19 0-15.692 8.271-25.156 18.814-29.229 4.019-1.554 8.373-2.31 12.71-2.317a37.497 37.497 0 0 1 12.624 2.162c10.488 3.765 18.676 12.286 18.676 24.653 0 18.473-7.699 29.304-17.692 33.995-4.037 1.878-8.448 2.748-12.851 2.699-4.356-0.049-8.767-1.017-12.832-2.773z"
                      fill="#999999" p-id="5688"></path>
                </svg>
                <p>扫一扫下载</p>
                <p>"预约挂号"APP</p>
              </div>
            </div>
          </div>
          <p class="tip1">尚医通官方指定平台</p>
          <p class="tip2">快速挂号 安全放心</p>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.login_container {
  ::v-deep(.el-dialog__body) {
    border-top: 1px solid #ccc;
  }

  .login {
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 20px;
    border: 1px solid #ccc;
  }

  .bottom {
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
      margin: 10px 0;
    }
  }

  .rightContent {
    img {
      width: 100px;
      height: 100px;
      margin: 5px 0;
    }

    .top {
      display: flex;
      justify-content: space-between;

      .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 20px;
        margin-left: 50px;

        p {
          margin: 5px 0;
        }
      }

      .download {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 16px;
        margin-right: 50px;

        p {
          margin: 5px 0;
        }
      }
    }
  }

  .tip1 {
    text-align: center;
    margin: 20px 0;
    font-size: 20px;
    font-weight: 900;
  }

  .tip2 {
    text-align: center;
    margin: 20px 0;
    font-size: 20px;
    font-weight: 900;
  }
}
</style>