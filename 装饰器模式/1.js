const Model = (function(){
    let instance = null;
    return function(){
        if(!instance){
            instance = document.createElement('div');
            instance.setAttribute('id', 'model');
            instance.style.display = 'none';
            document.body.appendChild(instance);
        }
        return instance;
    }
})();
document.querySelector('.open').addEventListener('click',function(){
    const model = Model();
    model.style.display = 'block';
})
document.querySelector('.close').addEventListener('click',function(){
    const model = Model();
    model.style.display = 'none';
});
// 新需求，用户关闭弹窗后，按钮置灰，按钮文字显示‘快去登录吧’
// 看 ---> 2.js 