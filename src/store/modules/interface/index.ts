import type {DepartmentArr, HospitalDetail, UserInfo} from '@/api/hospital/type'

export interface DetailState {
    hospitalInfo: HospitalDetail
    departmentArr: DepartmentArr
}

export interface LoginDialogState {
    visible: boolean
    loginResult: UserInfo
}