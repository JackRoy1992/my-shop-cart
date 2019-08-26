import Vue from 'vue';
import VueRouter from 'vue-router';
import Routers from './router';
import Vuex from 'vuex';
import App from './app.vue';
import './style.css';
// import product_data from './product';
import product_data from './newproduct'
import util from './util';
Vue.use(VueRouter);
Vue.use(Vuex);

//路由配置
const RouterConfig = {
    //使用H5 history模式
    mode: 'history',
    routes: Routers
};

const router = new VueRouter(RouterConfig);

//跳转前设置title
router.beforeEach((to, from, next) => {
    window.document.title = to.meta.title;
    next();
});
//跳转后设置scroll为原点
router.afterEach((to, from, next) => {
    window.scrollTo(0, 0);
});

//配置Vuex状态管理
const store = new Vuex.Store({
    state: {
        //商品列表信息
        productList: [],
        //购物车数据，数组形式，数据元素为对象（商品id，购买数量count）
        cartList: util.getLocal('Mycart')||[],
        //当前用户账号
        username: window.localStorage.getItem('username'),
        //登录状态
        loginStatus: !!window.localStorage.getItem('loginStatus'),
    },
    getters: {
        //品牌、颜色筛选
        brands: state => {
            const brands = state.productList.map(item => item.brand);
            return util.getFilterArray(brands);
        },
        colors: state => {
            let colors = []
            state.productList.forEach(item=>{
                item.children.forEach(item=>{
                    colors.push(item.color)
                })
            })
            return util.getFilterArray(colors);
        }
        // colors: state => {
        //     const colors = state.productList.map(item => item.color);
        //     return util.getFilterArray(colors);
        // }
    },
    //mutations只能以同步方式
    mutations: {
        //添加商品列表
        setProductList(state, data){
            state.productList = data;
        },
        //添加购物车
        addCart(state, AddPro){
            const {categoryId,children:{goodsId}} = AddPro
            const isAdded = state.cartList.find(item=>item.categoryId===categoryId && item.children.goodsId === goodsId)
            if(!AddPro.children.stock){
                alert('该商品已售罄')
                return false
            }
            if(isAdded){
                isAdded.count++
                if(isAdded.count >= AddPro.children.stock){
                    isAdded.count = AddPro.children.stock
                }
            } else {
                state.cartList.push({
                    ...AddPro,
                    count:1
                })
            }
            util.saveLocal(state.cartList)
            // const isAdded = state.cartList.find(item => item.id === id);
            // const product = state.productList.find(item=>item.id === id)
            // if(!product.stock){
            //     alert('该商品已售罄')
            //     return false
            // }
            // //如果不存在设置购物车为1，存在count++
            // if(isAdded){
            //     isAdded.count++;
            // }else{
            //     state.cartList.push({
            //         id: id,
            //         count: 1
            //     })
            // }
        },
        //修改购物车商品数量
        editCartCount(state, payload){
            const cartProduct = state.cartList.find(item => item.categoryId === payload.categoryId&&item.children.goodsId === payload.goodsId);
            // const product = state.productList.find(item=>item.id === payload.id)
            if(cartProduct.children.stock <= cartProduct.count && payload.count ===1) return false  
            cartProduct.count += payload.count;
            util.saveLocal(state.cartList)
        },
        //删除购物车商品
        deleteCart(state, pro){
            const {categoryId,children:{goodsId}} = pro
            const index = state.cartList.findIndex(item => item.categoryId === categoryId && item.children.goodsId === goodsId);
            state.cartList.splice(index, 1)
            util.saveLocal(state.cartList)
        },
        changeCount(state,{categoryId,goodsId,count}){
            let product = state.productList.find(item=> item.categoryId === categoryId)
            let curPro = product.children.find(item=>item.goodsId === goodsId)
            curPro.stock -=count
            product.sales +=count
        },
        //清空购物车
        emptyCart(state){
            state.cartList = [];
            util.saveLocal(state.cartList)
        },
        getUser(state, username){
            state.username = username;
        },
        getLoginStatus(state, flag){
            state.loginStatus = flag;
        }
    },
    actions: {
        //异步请求商品列表，暂且使用setTimeout
        getProductList(context){
            setTimeout(() => {
                context.commit('setProductList', product_data)
            }, 500);
        },
        //购买
        buy(context,cartList){
            //生产环境使用ajax请求服务端响应后再清空购物车
            return new Promise(resolve => {
                cartList.forEach(({categoryId,count,children:{goodsId}})=>{
                    context.commit('changeCount',{categoryId,goodsId,count})
                })
                setTimeout(() => {
                    context.commit('emptyCart',cartList);
                    resolve();
                }, 500);
            });
        },
    }
});
const app = new Vue({
    el: '#app',
    router,
    store,
    render: h => {
        return h(App)
    }
})


