//商品列表路由配置
// import List from './views/list.vue'
// import Product from './views/product.vue'
// import Cart from './views/cart.vue'
// import Login from './views/login.vue'
const routers = [
    {
        path: '/list',
        meta: {
            title: '商品列表'
        },
        // component: List
        component: (resolve) => {
            require(['./views/list.vue'], resolve)
        }
    },
    {
        path: '/product/:id',
        meta: {
            title: '商品详情'
        },
        // component: Product
        component: (resolve) => require(['./views/product.vue'], resolve)
    },
    {
        path: '/cart',
        meta: {
            title: '购物车'
        },
        // component: Cart
        component: (resolve) => require(['./views/cart.vue'], resolve)
    },
    {
        path: '/login/:loginStatus',
        meta: {
            title: '登录注册'
        },
        // component: Login
        component: (resolve) => require(['./views/login.vue'], resolve)
    },
    {
        path: '/swiper',
        meta:{
            title:'轮播图'
        },
        component: (resolve)=> require(['./views/swiper.vue'],resolve)
    },
    {
        path: '*',
        redirect: '/login/login'
    }
];
export default routers;
