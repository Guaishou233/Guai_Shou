import Detail from "@/pages/Detail";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Search from "@/pages/Search";
import addCartSuccess from "@/pages/addCartSuccess";
import shopCart from "@/pages/ShopCart";

export default [
    {
        path: "/ShopCart",
        name:'ShopCart',
        component: shopCart,
        meta: { show: true }
    },
    {
        path: "/addCartSuccess",
        name:'addCartSuccess',
        component: addCartSuccess,
        meta: { show: true }
    },
    {
        path: "/Detail/:iid",
        name:'Detail',
        component: Detail,
        meta: { show: true }
    },
    {
        path: "/Home",
        component: Home,
        meta: { show: true }
    },
    {
        path: "/Login",
        component: Login,
        meta: { show: true }
    },
    {
        path: "/Register",
        component: Register,
        meta: { show: false },
    },
    {
        path: "/Search/:keyword?",
        component: Search,
        meta: { show: true },
        name: "Search"
    },
    {
        path: "*",
        redirect: "/Home"
    }
]