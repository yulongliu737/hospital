export interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}

export interface HospitalDetail {
    hospital: {
        id: string,
        createTime: string,
        updateTime: string,
        isDeleted: number,
        param: {
            hostypeString: string,
            fullAddress: string
        },
        hoscode: string,
        hosname: string,
        hostype: string,
        provinceCode: string,
        cityCode: string,
        districtCode: string,
        address: string,
        logoData: string,
        intro: string,
        route: string,
        status: string
    },
    bookingRule: {
        cycle: number,
        releaseTime: string,
        stopTime: string,
        quitDay: number,
        quitTime: string,
        rule: string []
    }
}

export interface HospitalDetailResponseData extends ResponseData {
    data: HospitalDetail
}

export interface Department {
    depcode: string,
    depname: string,
    children?: Department[]
}

// 科室数组
export type DepartmentArr = Department[]

export interface DepartmentResponseData extends ResponseData {
    data: DepartmentArr
}

// 用户登录接口需要携带的参数类型
export interface LoginData {
    phone: string,
    code: string,
}

// 登录接口返回用户信息数据
export interface UserInfo {
    name: string,
    token: string
}

export interface UserLoginResponseData extends ResponseData {
    data: UserInfo
}

export interface BaseMap {
    workDateString: string,
    releaseTime: string,
    bigname: string,
    stopTime: string,
    depname: string,
    hosname: string
}

export interface WorkData {
    workDate: string,
    workDateMd: string,
    dayOfWeek: string,
    docCount: number,
    reservedNumber: number,
    availableNumber: number,
    status: number
}

export type BookingScheduleList = WorkData[]

export interface HospitalWorkData extends ResponseData {
    data: {
        total: number,
        bookingScheduleList: BookingScheduleList,
        baseMap: BaseMap
    }
}

export interface Doctor {
    id: string,
    createTime: string,
    updateTime: string,
    isDeleted: string,
    param: {
        dayOfWeek: string,
        depname: string,
        hosname: string,
    },
    hoscode: string,
    depcode: string,
    title: string,
    docname: string,
    skill: string,
    workDate: string,
    workTime: number,
    reservedNumber: number,
    availableNumber: number,
    status: number,
    hosScheduleId: string,
    amount: number
}

export interface DoctorResponseData extends ResponseData {
    data: Doctor[]
}