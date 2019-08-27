<template>
    <div class="swiper" @mouseenter="stopSwiper()" @mouseleave="continuteSwiper()">  
                <transition-group tag="ul" name="list">
                <li class="swiperItem" v-for="(item,index) in imgArr" :key="index" 
                  v-show="index === currentIndex">
                    <img :src="item">
                </li>
                </transition-group>
        <div class="pointer">
            <span v-for="(item,index) in imgArr"  @click="changeSwiper(index)" :key="index" 
            class="dot"
            :class="{active: index === currentIndex}"
            ></span>
        </div>
    </div>
</template>
<style scoped>
    ul {
        list-style: none;
        width: 100%;
        height: 220px;
        position: relative;
    }
    .swiper{
        width: 220px;
        height: 250px;
        position: relative;
        overflow: hidden;
    }
    .swiperItem {
        position: absolute;
        width: 100%;
        height: 100%;
    }
    .pointer {
        width: 200px;
        height: 30px;
        text-align: center;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%)
    }
    .dot {
        margin: 2px;
        display: inline-block;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: red;
    }
    .dot.active {
        background-color: blue;
    }
    .list-enter {
        transform: translateX(100%)
    }
    .list-enter-to {
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
</style>
<script>
export default {
    data(){
        return {
            currentIndex:0,
            // 定时器
            timer: null,
            // 轮播图图源
            imgArr:[
                '/src/images/airPods.jpg',
                '/src/images/BeatsX_1.jpg',
                '/src/images/BeatsX_2.jpg',
                '/src/images/BeatsX_3.jpg',
                '/src/images/BeatsX_4.jpg'
            ]
        }
    },
    
    methods:{
        changeSwiper(index){
            this.currentIndex = index
        },
        stopSwiper(){
            clearInterval(this.timer)
        },
        continuteSwiper(){
            this.timer = setInterval(()=>{
                this.currentIndex ++
                if(this.currentIndex>=this.imgArr.length){
                    this.currentIndex = 0
                }
            },2000)
        }
    },
    mounted(){
        this.timer = setInterval(()=>{
            this.currentIndex ++
            if(this.currentIndex>=this.imgArr.length){
                this.currentIndex = 0
            }
        },2000)
    },
}
</script>