/**
 * 策略模式：算法提取、算法封装、分发优化
 * 遵循的原则：’单一职责‘’开放封闭‘
 * 从需求理解代码：
 *  询价功能的实现
 * 
 */
// if-else一把梭
function askPrice(tag, originPrice) {
    if (tag === 'pre') {
        // ...代码逻辑
    }
    if (tag === 'onSale') {
        // ...
    }
    if (tag === 'back') {
        // ...
    }
}
// 单一功能改造-封装
function prePrice() {

}
function onScalePrice() {

}
function backPrice() {

}
function askPrice(tag, originPrice) {
    if (tag === 'pre') {
        return prePrice()
    }
    if (tag === 'onSale') {
        return onScalePrice()
    }
    if (tag === 'back') {
        return backPrice()
    }
}
// 策略模式的使用
const priceProcessor = {
    pre() { },
    onSale() { },
    back() { }
}
function askPrice(tag, originPrice) {
    priceProcessor[tag](originPrice);
}