const Model = (function () {
    let instance = null;
    return function () {
        if(!instance){
            instance = document.createElement('div');
            instance.id = 'model';
            instance.style.display = 'none';
            document.body.appendChild(instance);
        }
        return instance;
     }
})();
class OpenButton{
    onClick(){
        const model = Model();
        model.style.display = 'block';
    }
}
// 装饰器类
class Decorator{
    constructor(open_btn){
        this.open_btn = open_btn;
    }
    onClick(){
        this.open_btn.onClick();
        this.changeButtonStatus();
    }
    changeButtonStatus(){
        this.changeButtonText();
        this.changeButtonDisable();
    }
    changeButtonText(){
        this.open = document.querySelector('.open');
        this.open.innerText = '快去登录吧';
    }
    changeButtonDisable(){
        this.open.setAttribute('disabled', true)
    }
}
const open_btn = new OpenButton();
const decorator = new Decorator(open_btn);
document.querySelector('.open').addEventListener('click', function(){
    decorator.onClick();
})