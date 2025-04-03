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