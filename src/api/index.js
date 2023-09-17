import requests from "./request";
import mockrequest from "./mockrequest";
// 统一接口


export const reqCategroyList = () =>requests({url:'/product/getBaseCategoryList',method:'get'});


export const reqBannerList = () =>  mockrequest({ url: '/banner', method: 'get' });


export const reqFloorList = () =>  mockrequest({ url: '/floor', method: 'get' });

export const reqSearchInfo = (params) => requests({ url:'/list',method:'post',data:params});

//获取商品详情界面
export  const  reqItemDetail = (iid) => requests({url:`/item/${ iid }`, method:'get'})

//发送购买商品消息
export  const postItemPurchase = (iid,itemNum) =>requests({url:`/cart/addToCart/${iid}/${itemNum}`,method:"post"})

//获取购物车界面
export  const  reqShoppingCart = () => requests({url:"/cart/cartList", method:'get'})

//删除购物车物品
export  const  deleteShoppingItem = (iid) => requests({url:`/cart/deleteCart/${iid}`,method:"delete"})

//选中物品
export  const checkedItem =(iid,isChecked) => requests({url:`/cart/checkCart/${iid}/${isChecked}`,method:"get"})

