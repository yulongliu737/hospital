// 医院详情
import request from '@/utils/request'
import type {
    DepartmentResponseData,
    HospitalDetailResponseData,
    LoginData,
    UserLoginResponseData
} from "@/api/hospital/type.ts";

// 通过枚举管理接口地址
enum API {
    HOSPITALDETAIL_URL = '/hosp/hospital/',
    // 获取某一个医院的科室数据
    HOSPITAL_DEPARTMENT_URL = '/hosp/hospital/department/',
    // 用户登录
    USER_LOGIN_URL = '/user/login',
}

export const reqHospitalDetail = (hoscode: string) => request.get<any, HospitalDetailResponseData>(API.HOSPITALDETAIL_URL + hoscode)

export const reqHospitalDepartment = (hoscode: string) => request.get<any, DepartmentResponseData>(API.HOSPITAL_DEPARTMENT_URL + hoscode)

export const reqUserLogin = (data: LoginData) => request.post<any, UserLoginResponseData>(API.USER_LOGIN_URL, data)

