// 使用单例模式实现一个Storage
// #第一种方法：静态方法版本
// class Storage{
//     getItem(key){
//         return window.localStorage.getItem(key)
//     }
//     setItem(key, val){
//         return window.localStorage.setItem(key, val);
//     }
//     static getInstance(){
//         if(!Storage.instance){
//             Storage.instance = new Storage();
//         }
//         return Storage.instance;
//     }
// }
// const s1 = Storage.getInstance();
// s1.setItem('name', 'zf');
// console.log(s1.getItem('name'));
// #第二种方法：闭包版本
function StorageBase() { };
StorageBase.prototype.setItem = function (key, val) {
    return window.localStorage.setItem(key, val);
}
StorageBase.prototype.getItem = function (key) {
    return window.localStorage.getItem(key);
}
const Storage = (function () {
    let instance;
    return function () {
        if (!instance) {
            instance = new StorageBase();
        }
        return instance;
    }
})();
const s2 = Storage();
s2.setItem('age', 18);
console.log(s2.getItem('age'))