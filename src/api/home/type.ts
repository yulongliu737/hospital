export interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}

export interface Hospital {
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
    status: string,
    bookingRule: {
        cycle: number,
        releaseTime: string,
        stopTime: string,
        quitDay: number,
        quitTime: string,
        rule: string []
    }
}

export type Content = Hospital[];

export interface HospitalResponseData extends ResponseData {
    data: {
        content: Content,
        pageable: {
            sort: {
                sorted: boolean,
                unsorted: boolean,
                empty: boolean
            },
            offset: number,
            pageNumber: number,
            pageSize: number,
            paged: boolean,
            unpaged: boolean
        },
        totalPages: number,
        totalElements: number,
        last: boolean,
        first: boolean,
        sort: {
            sorted: boolean,
            unsorted: boolean,
            empty: boolean
        },
        size: number,
        number: number,
        numberOfElements: number,
        empty: boolean
    }
}

export interface HospitalLevelAndRegion {
    id: number,
    createTime: string,
    updateTime: string,
    isDeleted: number,
    param: any,
    parentId: number,
    name: string,
    value: string,
    dictCode: string,
    hasChildren: boolean,
}

export type HospitalLevelAndRegionArr = HospitalLevelAndRegion[];

// 获取等级或医院地区接口返回数据类型
export interface HospitalLevelAndRegionResponseData extends ResponseData {
    data: HospitalLevelAndRegion[];
}

export interface HospitalInfo extends ResponseData {
    data: Content
}

export interface CrCode extends ResponseData {
    data: string
}

// 微信扫码登录ts类型
export interface WXLogin {
    redirectUri: string,
    appid: string,
    scope: string,
    state: string
}

export interface WXLoginResponseData extends ResponseData {
    data: WXLogin
}