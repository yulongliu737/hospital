// 对axios二次封装
import axios from 'axios'
const request = axios.create({
    baseURL:'/api',
    timeout:5000 // 超出5s请求失败
})

request.interceptors.request.use((config) => {
    return config;
})

request.interceptors.response.use((response) => {
   // console.log('响应拦截器:' + JSON.stringify(response.data.data));
    return response.data;
}, (error) => {
    return Promise.reject(new Error(error.message));
})

export default request;

