// 医院详情
import request from '@/utils/request'
import type {
    DepartmentResponseData, DoctorResponseData,
    HospitalDetailResponseData, HospitalWorkData,
    LoginData,
    UserLoginResponseData, UserResponseData
} from "@/api/hospital/type.ts";

// 通过枚举管理接口地址
enum API {
    HOSPITALDETAIL_URL = '/hosp/hospital/',
    // 获取某一个医院的科室数据
    HOSPITAL_DEPARTMENT_URL = '/hosp/hospital/department/',
    // 用户登录
    USER_LOGIN_URL = '/user/login',
    // 获取预约挂号
    HOSPITAL_WORK_URL = '/hosp/hospital/auth/getBookingScheduleRule/',
    // 获取某一个科室某一天相应医生排版的数据
    DOCTOR_URL = '/hosp/hospital/auth/findScheduleList/',
    // 获取某个账号下的就诊人信息
    GET_USER_URL = '/user/patient/auth/findAll'
}

export const reqHospitalDetail = (hoscode: string) => request.get<any, HospitalDetailResponseData>(API.HOSPITALDETAIL_URL + hoscode)

export const reqHospitalDepartment = (hoscode: string) => request.get<any, DepartmentResponseData>(API.HOSPITAL_DEPARTMENT_URL + hoscode)

export const reqUserLogin = (data: LoginData) => request.post<any, UserLoginResponseData>(API.USER_LOGIN_URL, data)

export const reqAppointmentRegistration = (page: number, limit: number, hoscode: string, depcode: string) => request.get<any, HospitalWorkData>(API.HOSPITAL_WORK_URL + `${page}/${limit}/${hoscode}/${depcode}`)

// 获取医生排班数据
export const reqDocInfo = ( hoscode: string, depcode: string, workDate: string) => request.get<any, DoctorResponseData>(API.DOCTOR_URL + `${hoscode}/${depcode}/${workDate}`)

export const reqPatient = () => request.get<any, UserResponseData>(API.GET_USER_URL)
