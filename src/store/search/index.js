
import { reqSearchInfo } from "@/api";
const state = {
    searchInfoResult: {}
};
const mutations = {
    GETSEARCHINFO(state, searchInfoResult) {
        state.searchInfoResult = searchInfoResult;
    }
};
const actions = {
    async getSearchInfo({ commit }, params ) {
        const searchInfoResult = await reqSearchInfo(params);
        if (searchInfoResult.code == 200) {
            commit("GETSEARCHINFO", searchInfoResult.data);
        }
    }
};
const getters = {
    attrsList(state){
        return state.searchInfoResult.attrsList || [];
    },
    goodsList(state){
        return state.searchInfoResult.goodsList || [];
    },
    trademarkList(state){
        return state.searchInfoResult.trademarkList || [];
    }
};



export default {
    state,
    mutations,
    actions,
    getters
}