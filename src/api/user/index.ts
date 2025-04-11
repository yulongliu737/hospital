import request from '@/utils/request'
import type {SubmitOrder} from "@/api/user/type.ts";

enum API {
    SUBMIT_ORDER_URL = 'order/orderInfo/auth/submitOrder/'
}

export const reqSubmitOrder = (hoscode: string, scheduleId: string, patientId: string) => request.post<any, SubmitOrder>(API.SUBMIT_ORDER_URL + `${hoscode}/${scheduleId}/${patientId}`, {})