import axios from "axios";
//引入进度条
import nProgress from "nprogress";
//引入进度条样式
import "nprogress/nprogress.css";

let requests = axios.create({
    baseURL:"/mock",
    timeout:5000
});

requests.interceptors.request.use((config) => {
    //进度条开始
    nProgress.start();
    return config;
});

requests.interceptors.response.use((res) =>{
    //进度条结束
    nProgress.done();
    return res.data;
},(err) =>{
    alert(err.message);
    return new Promise();
});



export default requests;