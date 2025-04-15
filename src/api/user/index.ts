import request from '@/utils/request'
import type {OrderInfoResponse, PayInfoResponse, PayResult, SubmitOrder, UserParams} from "@/api/user/type.ts";

enum API {
    SUBMIT_ORDER_URL = 'order/orderInfo/auth/submitOrder/',
    // 获取订单详情信息
    GET_ORDER_INFO_URL = 'order/orderInfo/auth/getOrderInfo/',
    // 取消订单
    ORDER_CANCEL_URL = 'order/orderInfo/auth/cancelOrder/',
    // 获取订单支付二维码
    QRCODE_URL = '/order/weixin/createNative/',
    // 查询订单支付的结果
    PAY_RESULT_URL = 'order/weixin/queryPayStatus/',
    // 用户认证
    USER_VERIFICATION_URL = '/user/auth/userAuah'
}

export const reqSubmitOrder = (hoscode: string, scheduleId: string, patientId: number) => request.post<any, SubmitOrder>(API.SUBMIT_ORDER_URL + `${hoscode}/${scheduleId}/${patientId}`, {})

export const reqOrderInfo = (id: string) => request.get<any, OrderInfoResponse>(API.GET_ORDER_INFO_URL + id)

export const reqCancelOrder = (id: string) => request.get<any, any>(API.ORDER_CANCEL_URL + id)

export const reqQrcode = (orderId: string) => request.get<any, PayInfoResponse>(API.QRCODE_URL + orderId)

export const reqQueryPayStatus = (orderId: string) => request.get<any, PayResult>(API.PAY_RESULT_URL + orderId)
// 用户认证
export const reqAuth = (data: UserParams) => request.post<any, any>(API.USER_VERIFICATION_URL, data)