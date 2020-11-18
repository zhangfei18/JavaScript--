/**
 * 代理模式
 * 什么是？：一个对象通过某种代理的模式来控制对另一个对象的访问；
 * 代理的实际应用：
 * 1.事件代理： 可以大大的优化性能
 * 2.虚拟代理： 将一些代理的操作交付于它
 * 3.缓存代理：避免大量的计算
 */
// 虚拟代理
let oimg = document.querySelector('img');
class PreLoadImage {
    constructor(imgNode) {
        this.imgNode = imgNode;
    }
    setSrc(url) {
        this.imgNode.src = url;
    }
}
// 代理：
class ProxyImage {
    static shamUrl = 'xxxx';
    constructor(tarImg) {
        this.tarImg = tarImg;
    }
    setSrc(url) {
        let diliImg = new Image;
        Image.src = url;
        Image.onload = function () {
            this.tarImg.setSrc(url)
        }
    }
}
let pImg = new PreLoadImage(oimg);
let proxyImg = new ProxyImage(pImg);
// 缓存代理
function addAll() {
    let len = arguments.length;
    let result = 0;
    for (let i = 0; i < len; i++) {
        result+=arguments[i];
    }
    return result;
}
const proxyAddAll=(function(){
    let cache={};
    return function(){
        let args = Array.prototype.join.call(arguments);
        if(cache[args]){
            return cache[args];
        }
        return cache[args] = addAll(...arguments);
    }
})()