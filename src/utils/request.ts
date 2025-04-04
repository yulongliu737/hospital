// 对axios二次封装
import axios from 'axios'
import {ElMessage} from "element-plus";

const request = axios.create({
    baseURL: '/api',
    timeout: 20000 // 超出5s请求失败
})

request.interceptors.request.use((config) => {
    return config;
})

request.interceptors.response.use((response) => {
    // console.log('响应拦截器:' + JSON.stringify(response.data.data));
    return response.data;
}, (error) => {
    let status = error?.response?.status;
    switch (status) {
        case 404:
            ElMessage({
                type: 'error',
                message: '404'
            })
            break;
        default:
            ElMessage({
                type: 'error',
                message: '未知错误'
            })
            break;
    }
    return Promise.reject(new Error(error.message));
})

export default request;

