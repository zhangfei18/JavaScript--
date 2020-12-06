// 缓存代理
function addAll() {
    let len = arguments.length;
    let result = 0;
    for (let i = 0; i < len; i++) {
        result += arguments[i];
    }
    return result;
}
const proxyAddAll = (function () {
    let cache = {};
    return function () {
        let args = Array.prototype.join.call(arguments);
        if (cache[args]) {
            return cache[args];
        }
        return cache[args] = addAll(...arguments);
    }
})();
/**
 * 思考题：
 * 1.缓存代理如何用于ajax异步数据的请求
 * 2.如何利用高阶函数实现一个创建缓存代理的工厂
 * 3.还有什么代理呢？
 */