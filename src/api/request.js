import axios from "axios";
//引入进度条
import nProgress from "nprogress";
//引入进度条样式
import "nprogress/nprogress.css";
//引入uuid信息
import store from "@/store";

let requests = axios.create({
    baseURL:"/api",
    timeout:5000
});

requests.interceptors.request.use((config) => {
    //进度条开始
    if (store.state.detail.uuid_token){
        config.headers.userTempId = store.state.detail.uuid_token
    }
    nProgress.start();
    return config;
});

requests.interceptors.response.use((res) =>{
    //进度条结束
    nProgress.done();
    return res.data;
},(error) =>{
    alert(error.message);
    return new Promise();
});



export default requests;