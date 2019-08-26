<template>
    <div class="swiper">  
            <!-- <div class="box"> -->
                <transition-group tag="ul" name="list"  :style="{width:swiperWidth}">
                <li class="swiperItem" v-for="(item,index) in imgArr" :key="index" 
                  v-show="index === currentIndex" :style="{width:itemWidth}"
                >
                <!-- <div class="swiperItem" v-for="item in imgArr" :key="item.id"> -->
                    <img :src="item">
                    <!-- <img :src="item.image"> -->
                </li>
                </transition-group>
            <!-- </div> -->
        <div class="pointer">
            <span v-for="(item,index) in imgArr"  @click="changeSwiper(index)" @mouseover="stopSwiper" :key="index" 
            class="dot"
            :class="{active: index === currentIndex}"
            ></span>
        </div>
    </div>
</template>
<style scoped>
    ul {
        list-style: none;
        overflow: hidden;
    }
    .swiper{
        width: 220px;
        height: 250px;
        overflow: hidden;
        position: relative;
    }
    .swiperItem {
        height: 220px;
        float: left;
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
            ],
            // 鼠标悬停时
            hover:false,
            // 每一张图片的宽度
            itemWidth: '',
            // ul的宽度
            swiperWidth: ''
        }
    },
    // 挂载之前动态计算ul长度
    beforeMount(){
        let total = this.imgArr.length
        this.swiperWidth = 220 * total +'px'
        this.itemWidth = 100/total +'%'
    },
    methods:{
        changeSwiper(index){
            this.currentIndex = index
        },
        stopSwiper(){
            clearInterval(timer)
        }
    },
    mounted(){
        this.timer = setInterval(()=>{
            this.currentIndex ++
            if(this.currentIndex>this.imgArr.length){
                this.currentIndex = 0
            }
        },2000)
    },
}
</script>