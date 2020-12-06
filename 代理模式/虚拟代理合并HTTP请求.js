const syncchronousFile = function (id) {
    // 上传文件
    console.log('开始同步文件：', id);
}
const proxySyncchronousFile = (function () {
    let cache = [];
    let timer;
    return function (id) {
        cache.push(id);
        if (timer) {
            return;
        }
        timer = setTimeout(() => {
            syncchronousFile(cache);
            timer = null;
            clearTimeout(timer);
        }, 2000);
    }
})();
const oCheckBoxs = document.querySelectorAll('input');
Function.prototype.uncurrying = function () {
    const self = this;//数组的方法
    return function () {
       return Function.prototype.call.apply(self, arguments);
    }
};
const _each = Array.prototype.forEach.uncurrying();
_each(oCheckBoxs, (ele)=>{
    ele.onclick  = function(){
        if(this.checked === true){
            proxySyncchronousFile(this.id);
        }
    }
})