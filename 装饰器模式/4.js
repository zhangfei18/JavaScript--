/**
 * 1.类装饰器：一个参数
 * 2.方法装饰器：三个参数 : 参数1：要修饰方法的原型，参数2：修饰的目标属性属性名，参数3：属性描述对象
 *      
 */

const Model = (function () {
    let instance = null;
    return function () {
        if (!instance) {
            instance = document.createElement('div');
            instance.id = 'model';
            instance.style.display = 'none';
            document.body.appendChild(instance);
        }
        return instance;
    }
})();
function changeButtonStatus() {
    this.changeButtonText();
    this.changeButtonDisable();
}
function changeButtonText() {
    this.open = document.querySelector('.open');
    this.open.innerText = '快去登录吧';
}
function changeButtonDisable() {
    this.open.setAttribute('disabled', true)
}
function funcDecorator(target, name, descriptor) {
    let originalMethod = descriptor.value;
    descriptor.value = function () {
        changeButtonStatus();//自己的逻辑
        return originalMethod.apply(this, arguments)
    }
    return descriptor;
}
class OpenButton {
    // @funcDecorator
    onClick() {
        const model = Model();
        model.style.display = 'block';
    }
}

// 总结：感觉装饰器模式就是函数包装函数（待以后慢慢领悟）！