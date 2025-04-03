// 定义用户相关的仓库

import {defineStore} from "pinia";
import type {LoginDialogState} from "@/store/modules/interface";
import type {LoginData, UserLoginResponseData} from "@/api/hospital/type.ts";
import { reqUserLogin} from "@/api/hospital";

const useUserStore = defineStore('User', {
    state: (): LoginDialogState => {
        return {
            visible: false,
            loginResult: JSON.parse(localStorage.getItem("USER_INFO") as string) || {},
        }
    },
    actions: {
        async userLogin(loginData: LoginData) {
            let result:UserLoginResponseData = await reqUserLogin(loginData);
            if (result.code === 200) {
                this.loginResult = result.data;
                // 持久化
                localStorage.setItem("USER_INFO", JSON.stringify(result.data));
            } else {
                return Promise.reject(new Error("result.message"));
            }
        }
    },
    getters: {}
})

export default useUserStore;