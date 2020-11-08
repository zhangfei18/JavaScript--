/**
 * 发布订阅：
 *  实现EventBus,
 * 大家可以看到，全程只有一个bus在’指挥‘，这就是发布-订阅模式，全局只有一个’全局事件总线‘在调度。
 * 发布-订阅模式和观察者模式的区别：
 *  1.观察者模式只是减少了模块之间的耦合，但是并没有完全解耦。发布订阅模式完全解耦。
 *  2.
 */

class EventBus {
    constructor() {
        this.handlers = {};//相当于DOM二级事件中的事件池
    }
    on(event, cb) {
        if (!this.handlers[event]) {
            this.handlers[event] = [];
        }
        this.handlers[event].push(cb);
    }
    emit(event, ...args) {
        let cbs = this.handlers[event];
        cbs.forEach((cb) => {
            cb(...args);
        });
    }
    off(event, cb) {
        let cbs = this.handlers[event];
        let index = cbs.indexOf();
        if (index !== -1) {
            cbs.splice(index, 1);
        }
    }
    once(event, cb) {
        // 将原有的事件cb进行函数包装，执行完后自己自动off.F
        let wrapper = (...args) => {
            cb(...args);
            this.off(event, cb)
        }
        this.on(event, wrapper)
    }
}