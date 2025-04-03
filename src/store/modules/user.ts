// 定义用户相关的仓库

import {defineStore} from "pinia";
import type {LoginDialogShowState} from "@/store/modules/interface";

const useUserStore = defineStore('User', {
    state: (): LoginDialogShowState => {
        return {
            visiable: false,
        }
    },
    actions: {},
    getters: {}
})

export default useUserStore;