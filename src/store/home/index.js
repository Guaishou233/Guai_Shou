//引用封装好的发送请求方法
import { reqCategroyList, reqBannerList , reqFloorList} from "@/api";

const state = {
    //存储返回值
    categoryList: [],
    bannerList: [],
    floorList:[]
};
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList;
    },
    GETBANNER(state, bannerList) {
        state.bannerList = bannerList;
    },
    GETFLOORLIST(state, floorList){
        state.floorList = floorList;
    }
};
const actions = {
    //发送请求
    async categoryList({ commit }) {
        const result = await reqCategroyList();
        if (result.code == 200) {
            //通过mutation 修改 state
            commit("CATEGORYLIST", result.data)
        }
    },
    async getMockBannerData({ commit }) {
        const bannerResult = await reqBannerList();
        if (bannerResult.code == 200) {
            //通过mutation 修改 state
            commit("GETBANNER", bannerResult.data)
        }
    },
    async getFloorList({commit}){
        const  floorResult = await reqFloorList();
        if(floorResult.code == 200){
            commit("GETFLOORLIST", floorResult.data)
        }
    } 
    
};
const getters = {};

export default {
    state,
    mutations,
    actions,
    getters
}