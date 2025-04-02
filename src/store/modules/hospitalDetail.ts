import {defineStore} from 'pinia'
import {reqHospitalDetail} from "@/api/hospital";
import type {HospitalDetailResponseData} from "@/api/hospital/type.ts";

const useDetailStore = defineStore('Detail', {
    state: () => {
        return {
            hospitalInfo: {}
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