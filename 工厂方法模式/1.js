/**
 * 工厂方法模式：
 * 例子‘广告投放’
 */

//  安全模式创建的工厂类
const Factory = function (type, content) {
    if (this instanceof Factory) {
        let i = this[type](content);
        return i;
    } else {
        return new Factory(type, content);
    }
}
// 工厂原型中设置创建所有类型数据对象的基类
Factory.prototype = {
    'Java': function (content) {
        // ...逻辑
    },
    'C': function (content) {
        // ...逻辑
    },
    "C++": function (content) {
        // ...逻辑
    },
    'JavaSctipt': function (content) {
        // ...逻辑
    }
    // 。。。后序可以添加更多的方法
}
