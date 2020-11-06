/**
 * 观察者模式：前端使用频率最高的开发模式，
 */
// 发布者
class Publisher {
    constructor() {
        this.observers = [];
        console.log('Publisher创建了');
    }
    addObser(ob) {
        this.observers.push(ob);
        console.log('添加了一个订阅者');
    }
    removeObser(ob) {
        console.log('移除了一个订阅者');
        this.observers.forEach((item, index) => {
            if (item === ob) {
                this.observers.splice(index, 1);
            }
        });
    }
    notify() {
        console.log('通知');
        this.observers.forEach((item, index) => {
            item.update(this);
        })
    }

}
// 订阅者
class Observer {
    constructor() {
        console.log('Observer创建了');
    }
    update() {
        console.log('更新');
    }
}
// 升级，拓展分发布者类，让所有的订阅者来监听某一个特定状态的改变
class PrdPublisher extends Publisher {
    constructor() {
        super();
        this.observers = [];
        this.prdState = null;
    }
    getPrdState() {
        return this.prdState;
    }
    setPrdState() {
        console.log('产品文档已更新');
        this.prdState = '产品文档已更新';
        this.notify();
    }

}
class DeveloperObserver extends Observer {
    constructor() {
        super();
        this.prdState = null;
    }
    update(publisher) {
        console.log('接收到产品文档已更新');
        this.prdState = publisher.prdState;
        this.work();
    }
    work() {
        console.log('开始了996的生活')
    }
}

let o1 = new DeveloperObserver();
let o2 = new DeveloperObserver();
let p1 = new PrdPublisher();
p1.addObser(o1);
p1.addObser(o2);
p1.notify()