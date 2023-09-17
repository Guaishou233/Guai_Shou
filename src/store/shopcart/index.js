import {reqShoppingCart , postItemPurchase , deleteShoppingItem, checkedItem} from "@/api"

const state = {
    shopCartInfo:[]
};
const mutations = {
    transformItemList(state,itemList){
        state.shopCartInfo = itemList
    }
};
const actions = {
    async getItemList({commit}){
        let result = await reqShoppingCart()
        if(result.code == 200){
            commit('transformItemList',result.data)
        }
    },
    async increment(context,item) {
        console.log(item.itemId)
        let result = await postItemPurchase(item.itemId,1)
        if (result.code == 200)
            return 'OK'
        else
            return Promise.reject(new Error("failed"));
    },
    async decrement(context,item) {
        let result = await postItemPurchase(item.itemId,-1)
        if (result.code == 200)
            return 'OK'
        else
            return Promise.reject(new Error("failed"));
    },
    async  changeNum(context,item){
        let result = await postItemPurchase(item.itemId,item.num)
        if (result.code == 200)
            return 'OK'
        else
            return Promise.reject(new Error("failed"));
    },
    async  deleteCartItem(context,item){
        let result = await deleteShoppingItem(item.itemId)
        if (result.code == 200)
            return 'OK'
        else
            return Promise.reject(new Error("failed"));
    },
    async checkItem(context,item){
        let result = await checkedItem(item.itemId.toString(),item.isCheked)
        if (result.code == 200)
            return 'OK'
        else
            return Promise.reject(new Error("failed"));
    }
};
const getters = {
    //计算数组里面第一个元素：对象
    CartInfo(state) {
        return state.shopCartInfo[0] || {};
    },
};

export default {
    state,
    mutations,
    actions,
    getters
}