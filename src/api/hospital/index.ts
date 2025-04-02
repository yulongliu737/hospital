// 医院详情
import request from '@/utils/request'
import type {HospitalDetailResponseData} from "@/api/hospital/type.ts";

// 通过枚举管理接口地址
enum API {
    HOSPITALDETAIL_URL = '/hosp/hospital/',
}

export const reqHospitalDetail = (hoscode: string) => request.get<any, HospitalDetailResponseData>(API.HOSPITALDETAIL_URL + hoscode)

