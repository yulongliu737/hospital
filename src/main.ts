import { createApp } from 'vue'
import App from '@/App.vue'
import '@/style/reset.scss'
import router from "@/router";

// 引入全局组件
import HospitalTop from '@/components/hospital_top/index.vue'
import HospitalBottom from '@/components/hospital_bottom/index.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import pinia from '@/store'
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import Login from '@/components/login/index.vue'

const app = createApp(App)
app.component('HospitalTop', HospitalTop)
app.component('HospitalBottom', HospitalBottom)
app.component('Login', Login)
app.use(router)
app.use(ElementPlus, {
    locale: zhCn,
})
app.use(pinia);
app.mount('#app')
