import type {DepartmentArr, HospitalDetail} from '@/api/hospital/type'

export interface DetailState {
    hospitalInfo: HospitalDetail
    departmentArr: DepartmentArr
}

export interface LoginDialogShowState {
    visiable: boolean
}