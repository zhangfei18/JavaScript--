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
function openModel(){
    let model = Model();
    model.style.display = 'block';
}
function changeButtonText(){
    const btn = document.querySelector('.open');
    btn.innerText = '快去登录吧';
}
function changeButtonDisable(){
    const btn = document.querySelector('.open');
    btn.setAttribute('disabled', true);
}
function changeButtonStatus(){
    changeButtonText();
    changeButtonDisable();
}
document.querySelector('.open').addEventListener('click', function(){
    openModel();
    changeButtonStatus();
})