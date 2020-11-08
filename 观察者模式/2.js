/**
 * Vue中的双向绑定（响应式更新）的原理
 *  observer: 监听器 ：用来给每个data的每个属性绑定getter和 setter函数，当属性变化时，然后通知通知Dep，Dep通知对应的watcher更新
 *  watcher: 订阅者 ： 接收Dep的通知进行更新
 *  compile: 编译器
 */
// 代码模拟实现
// observer实现
function observer(data) {
    if (data && typeof data === 'object') {
        Object.keys(data).forEach((key) => {
            defineReactive(data, key, data[key]);
        })
    }
}
function defineReactive(target, key, val) {
    if(typeof val === 'object'){
        observer(val);
    }
    const dep = new Dep();//给每个对象绑定一个‘观察者’
    Object.defineProperty(target, key, {
        enumerable: true,
        configurable: false,
        get: function(){
            return val;
        },
        set: function(value){
            console.log(`${target}对象的${key}属性的值由${val}改变为${value}`);
            val = value;
            dep.notify();//执行nitify方法通知订阅者更新
        }
    })
}
// Dep实现
class Dep{
    constructor(){
        this.subs=[];
    }
    addSub(sub){
        this.subs.push(sub)
    }
    notify(){
        this.subs.forEach((sub)=>{
            sub.update();
        })
    }
}
