import { reqItemDetail,postItemPurchase } from "@/api";
import {getUUid} from "@/utils/uuid/uuid";

const state = {
    //获得游客身份
    uuid_token : getUUid(),
    itemDetailedInfo:{}
};
const mutations = {
    receivedInfo(state,itemDetailedInfo){
        state.itemDetailedInfo = itemDetailedInfo
    }
};
const actions = {
    async reviceItemDetailedInfo({commit},iid){
        let itemDetailedInfo = await reqItemDetail(iid)
        if(itemDetailedInfo.code == 200){
            commit('receivedInfo',itemDetailedInfo.data)
        }
    },
    async postPurchaseInfo({commit},{iid,itemNum}){
        let result = await postItemPurchase(iid,itemNum)
        if (result.code == 200)
            return 'OK'
        else
            return Promise.reject(new Error("faile"));
    }
};
const getters = {
    getCategoryView(state){
        return state.itemDetailedInfo.categoryView||{}
    },
    getSkuInfo(state){
        return state.itemDetailedInfo.skuInfo||{}
    },
    getColor(state) {
        if (state.itemDetailedInfo.spuSaleAttrList.length >= 1)
            return state.itemDetailedInfo.spuSaleAttrList[0].spuSaleAttrValueList
        else
            return {}
    },
    getVersion(state){
        if (state.itemDetailedInfo.spuSaleAttrList.length >= 1)
            return state.itemDetailedInfo.spuSaleAttrList[1].spuSaleAttrValueList
        else
            return {}
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}