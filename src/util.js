export default {
    //去除前后空格
    trim(str){
        return str.replace(/^\s*(.*?)\s*$/g, '$1');
    },
    //数组去重
    getFilterArray(array){
        const set = new Set(array);
        return [...set];
    },
    //存到本地
    saveLocal(item){
        window.localStorage.setItem('MyCart',JSON.stringify(item))
    },
    //读取本地
    getLocal(){
        return JSON.parse(localStorage.getItem("MyCart"))
    }
}