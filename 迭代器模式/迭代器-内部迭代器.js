/**
 * 迭代器模式提供一种方法顺序访问一个聚合对象中的各个元素，而又不暴露该对象的内部表示。————《设计模式：可复用面向对象软件的基础》
 * #’公元前‘的迭代器模式：Array.prototype.forEach
 *  但是forEach方法只能遍历数组，其他的就无能为力了。
 *  比如NodeList集合、arguments。等等
 *  现在看看不同的集合却要用不同的手段去遍历，这样是不是很累？我们看看迭代器的定义：遍历集合的同时，我们不需要关心集合的内部结构。
 *  这也就是jQuery的each方法在’公元前‘为什么这么火的原因了！
 *  其实jQuery的each方法在内部也是根据不同的集合使用了不同的遍历方式。如对象使用for-in遍历，数组和类数组使用for循环进行遍历。
 * 
 * #ES6对迭代器的实现：
 *  JS原生的集合类型数据结构： Array Object Map Set，每种集合内部都有自己的独特的内部实现，
 *  因此ES6推出了 同一的接口机制—— 迭代器(Iterator);
 *  其规定任何的数据结构只要具有[Symbol.iterator]属性（这个属性是当前数据结构默认的迭代器生成函数），既可以被遍历，
 *  准确的说是被for-of和迭代器的next方法遍历， 而事实上，for of 的背后正式对next方法的反复调用。
 */

//  自己实现一个生成器函数：
function iteratorGenerator(list) {
    let idx = 0;
    let len = list.length;
    return {
        next() {
            let none = idx === len;
            let value = !none ? list[idx++] : undefined;
            return {
                value,
                none
            }
        }
    }
}
var iterator = iteratorGenerator(['1号','2号','3号']);
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())