/**
 * 外部迭代器主要用来弥补内部迭代器的缺陷：不够灵活性。
 * 而对于外部迭代器我们可以随意的控制循环的进行与停止，以及对元素操作。
 * 
 */
const Iterator = function (obj) {
    const current = 0;
    const next = function () {
        current += 1;
    }
    const isDone = function () {
        return current >= obj.length;
    }
    const getCurrItem = function () {
        return obj[current];
    }
    return {
        next,
        isDone,
        getCurrItem,
        length: obj.length
    }
};
// 再看看如何实现比较两个数组：
const comnpare = function (Iterator1, Iterator2) {
    if (Iterator1.length !== Iterator2.length) {
        console.log('不相等!');
        return;
    }
    while (!Iterator1.isDone() && !Iterator2.isDone()) {
        if (Iterator1.getCurrItem() !== Iterator2.getCurrItem()) {
            console.log('不相等！')
            return;
        }
        Iterator1.next()
        Iterator2.next()
    }
    console.log('相等');

}