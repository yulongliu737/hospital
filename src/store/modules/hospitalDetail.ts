import {defineStore} from 'pinia'
import {reqHospitalDetail} from "@/api/hospital";
import type {HospitalDetail, HospitalDetailResponseData} from "@/api/hospital/type.ts";
import type {DetailState} from "@/store/modules/interface";

const useDetailStore = defineStore('Detail', {
    state: (): DetailState => {
        return {
            hospitalInfo: ({} as HospitalDetail)
        }
    },
    actions: {
        async getHospital(hoscode: any) {
            let result:HospitalDetailResponseData = await reqHospitalDetail(hoscode);
            if (result.code === 200) {
                this.hospitalInfo = result.data;
            }
        }
    },
    getters: {}
})

export default useDetailStore