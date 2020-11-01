// 如何保证一个类只有一个实例?
// 给构造函数添加一个判断自己是否已经创建过一个实例的能力
class Dog {
    show() { console.log('我是一个单例') }
    // static getInstance(){
    //    if(!Dog.instance){
    //         Dog.instance = new Dog();
    //    }
    //    return Dog.instance;
    // }
}
Dog.getInstance = (function () {
    let instance = null;
    return function () {
        if (!instance) {
            instance = new Dog();
        }
        return instance;
    }

})()
const dog1 = Dog.getInstance();
const dog2 = Dog.getInstance();
console.log(dog1 === dog2);//false
// Vuex源码中如何确保实例的唯一?
// install.js文件
let Vue;
export function install(_Vue) {

    if (Vue) {
        // Vue有值得话表示存已经install过Vuex
        return;
    }
    Vue = _Vue;
    // 执行内部的逻辑
}