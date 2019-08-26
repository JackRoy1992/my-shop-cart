<template>
    <div class="product">
    <div class="product-main"> 
            <router-link class="link" :to="`/product/productId=${info.categoryId}&goodsId=${info.children[currentIndex].goodsId}`" >
                    <img :src="imgSrc">
            </router-link>
        <h4>{{info.name}}</h4>
        <h4>销量{{info.sales}}</h4>
        <h4>库存{{stock}}</h4>
        <span class="product-color"
            :class="{active: index === currentIndex}"
            v-for=" (item,index) in info.children"
            :key="item.categoryId"
            :style="{background: colors[item.color]}"
            @click="selectedColors(index)"
        ></span>
        <div class="product-cost">
            ￥{{cost}}
        </div>
        <div class="product-add-cart"
                :class = "{soldOut: !stock}"
                 @click.prevent="handleAddCart">加入购物车</div>
    </div>
            
    </div>
</template>

<script>
    export default {
        props: {
            info: Object,
        },
        data () {
            return {
                currentIndex:0,
                colors: {
                    '白色': '#ffffff',
                    '金色': '#dac272',
                    '蓝色': '#233472',
                    '红色': '#f2352e'
                }
            }
        },
        computed:{
            imgSrc(){
                return this.info.children.find((item,index)=> index === this.currentIndex).image
            },
            stock(){
                return this.info.children.find((item,index)=> index === this.currentIndex).stock
            },
            cost(){
                return this.info.children.find((item,index)=> index === this.currentIndex).cost
            }
        },
        methods: {
            selectedColors(index){
                this.currentIndex = index
            },
            handleAddCart(){
                let AddPro = {
                    ...this.info,
                    children: this.info.children.find((item,index)=>index === this.currentIndex)
                }
                // console.log(AddPro)
                this.$store.commit('addCart', AddPro);
            }
        }
    }
</script>
<!-- scoped属性表示只对当前组件有效，不影响其他组件 -->
<style scoped>
    .product{
        width: 25%;
        float: left;
    }
    .product-main{
        display: block;
        margin: 16px;
        padding: 16px;
        border: 1px solid #dddee1;
        border-radius: 6px;
        overflow: hidden;
        background: #fff;
        text-align: center;
        position: relative;
    }
    .product-main img{
        width: 100%;
    }
    h4{
        color: #222;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .product-main:hover h4{
        color: #0070c9;
    }
    .product-color{
        display: inline-block;
        width: 16px;
        height: 16px;
        border: 1px solid #dddee1;
        border-radius: 50%;
        margin: 6px 3px;
    }
    .product-color.active {
        border: 1px solid #000;
    }
    .product-cost{
        color: #de4037;
        margin-top: 6px;
    }
    .product-add-cart{
        display: none;
        padding: 4px 8px;
        background: #2d8cf0;
        color: #fff;
        font-size: 12px;
        border-radius: 3px;
        cursor: pointer;
        position: absolute;
        top: 5px;
        right: 5px;
    }
    .product-add-cart.soldOut {
        background-color: gray;
        cursor: not-allowed;
    }
    .product-main:hover .product-add-cart{
        display: inline-block;
    }
    .list-enter {
        transform: translateX(100%)
    }
    .list-enter-active {
        transition: all 1s ease;
        transform: translateX(0);
    }
    .list-leave {
        transform: translateX(0)
    }
    .list-leave-active {
        transition: all 1s ease;
        transform: translateX(-100%)
    }
    /* .link {
        display: block;
        width: 100%;
        height: 220px;
        overflow: hidden;
    }
    .swiper {
    }
    .swiperItem {
        float: left;
    } */
</style>