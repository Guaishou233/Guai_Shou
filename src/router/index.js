//配置路由
import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes"
Vue.use(VueRouter);



const rourter = new VueRouter({
    routes,
    scrollBehavior(to) {
        if (to.hash) {
            return {
                el: to.hash,
            }
        }
    },
})


//重写方法
let rewritePush = VueRouter.prototype.push;
let rewriteReplace = VueRouter.prototype.replace;

VueRouter.prototype.push = function(destination, resolve, reject){
    if (resolve || reject) {
        rewritePush.call(this, destination, resolve, reject);
    }
    else {
        rewritePush.call(this, destination, () => { }, () => { });
    }
}

VueRouter.prototype.replace = function(destination, resolve, reject){
    if (resolve || reject) {
        rewriteReplace.call(this, destination, resolve, reject);
    }
    else {
        rewriteReplace.call(this, destination, () => { }, () => { });
    }
}

export default rourter;

