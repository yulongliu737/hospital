import request from '@/utils/request'
import type {OrderInfoResponse, SubmitOrder} from "@/api/user/type.ts";

enum API {
    SUBMIT_ORDER_URL = 'order/orderInfo/auth/submitOrder/',
    // 获取订单详情信息
    GET_ORDER_INFO_URL = 'order/orderInfo/auth/getOrderInfo/',
}

export const reqSubmitOrder = (hoscode: string, scheduleId: string, patientId: string) => request.post<any, SubmitOrder>(API.SUBMIT_ORDER_URL + `${hoscode}/${scheduleId}/${patientId}`, {})

export const reqOrderInfo = (id: string) => request.get<any, OrderInfoResponse>(API.GET_ORDER_INFO_URL + id)