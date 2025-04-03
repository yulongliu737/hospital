// 统一管理首页模块接口
import request from '@/utils/request'
import type {HospitalInfo, HospitalLevelAndRegionResponseData, HospitalResponseData} from "@/api/home/type.ts";

// 通过枚举管理首页模块的接口地址
enum API {
    // 获取已有的医院的数据接口
    HOSPITAL_URL = '/hosp/hospital/',
    // 获取医院的等级与地区
    HOSPITAL_LEVEL_AND_REGION_URL = '/cmn/dict/findByDictCode/',
    HOSPITAL_INFO_URL = '/hosp/hospital/findByHosname/',
    // 获取验证码
    GET_USER_CODE_URL = '/sms/send/'
}

export const reqHospital = (page: number, limit: number, hosType = '', districtCode = '') => request.get<any, HospitalResponseData>(API.HOSPITAL_URL + `${page}/${limit}?hostype=${hosType}&districtCode=${districtCode}`,)

export const reqHospitalLevelAndRegion = (dictCode: string) => request.get<any, HospitalLevelAndRegionResponseData>(API.HOSPITAL_LEVEL_AND_REGION_URL + `${dictCode}`)

// 根据关键字获取医院的数据进行展示
export const reqHospitalInfo = (hosname: string) => request.get<any, HospitalInfo>(API.HOSPITAL_INFO_URL + `${hosname}`)

// 获取手机验证码
export const reqUserCode = (phoneNumber: string) => request.get<any, any>(API.GET_USER_CODE_URL + phoneNumber)
