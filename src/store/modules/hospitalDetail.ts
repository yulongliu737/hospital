import {defineStore} from 'pinia'
import {reqHospitalDepartment, reqHospitalDetail} from "@/api/hospital";
import type {DepartmentResponseData, HospitalDetail, HospitalDetailResponseData} from "@/api/hospital/type.ts";
import type {DetailState} from "@/store/modules/interface";

const useDetailStore = defineStore('Detail', {
    state: (): DetailState => {
        return {
            hospitalInfo: ({} as HospitalDetail),
            departmentArr: []
        }
    },
    actions: {
        async getHospital(hoscode: string) {
            let result:HospitalDetailResponseData = await reqHospitalDetail(hoscode);
            if (result.code === 200) {
                this.hospitalInfo = result.data;
            }
        },
        async getDepartment(hoscode: string) {
            let result:DepartmentResponseData = await reqHospitalDepartment(hoscode);
            if (result.code === 200) {
                this.departmentArr = result.data;
            }
        }
    },
    getters: {}
})

export default useDetailStore