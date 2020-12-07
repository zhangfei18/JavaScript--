/**
 * 定义：对象池维护一个装载空闲对象的池子，如果需要对象的时候，不是直接new，而是转从对象池里获取。
 *  如果对象池里没有空闲对象，则创建一个新的对象，当获取出的对象完成它的职责之后，再进入池子等待被下次获取。
 * 应用：HTTP连接池、数据库连接池、给可复用的DOM节点创建一个对象池。
 * 
 */
// 地图上的小气泡：
const toolTipFactory = (function () {
    let toolTipPool = [];
    return {
        create: function () {
            if (toolTipPool.length === 0) {
                let div = document.createElement('div');
                div.classList.add('tool')
                document.body.appendChild(div);
                return div;
            } else {
                return toolTipPool.shift();
            }
        },
        recover: function (dom) {
            return toolTipPool.push(dom);
        }
    }
})();
let ary = [];//存放dom
// 创建
for (let i = 0, str; str = ['A', 'B'][i++];) {
    let toolTip = toolTipFactory.create();
    toolTip.innerHTML = str;
    ary.push(toolTip);
}
// 回收：
for (let i = 0, toolTip; toolTip = ary[i++];) {
    toolTipFactory.recover(toolTip);
}
// 再次创建
// 如果上面不进行回收的话，现在页面上就是有八个节点，但是如果回收了的话现在页面上就是有六个节点
for (let i = 0, str; str = ['A', 'B', 'C', 'D', 'E', 'F'][i++];) {
    let toolTip = toolTipFactory.create();
    toolTip.innerHTML = str;
    ary.push(toolTip);
}

// 创建一个通用的对象池对象（把创建对象的具体过程封装起来）
const objectPoolFactory = function (createObjFn) {
    let objectPool = [];
    return {
        create: function () {
            return objectPool.length === 0 ? createObjFn.apply(this, arguments) : objectPool.shift();
        },
        recover: function (obj) {
            objectPool.push(obj);
        }
    }
}
