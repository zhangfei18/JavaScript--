const registerForm = document.getElementById('registerForm');
// 普通书写格式
// registerForm.onsubmit = function () {
//     // console.log('submit');
//     if (registerForm.userName.value === '') {
//         alert('用户名不能为空！');
//         return false;
//     }
//     if (registerForm.password.value.length < 6) {
//         alert('密码长度不能少于6位！');
//         return false;
//     }
//     if (!/^1([3|3|8|9][0-9]{9})$/.test(registerForm.phoneNumber.value)) {
//         alert('手机号码格式不正确');
//         return false;
//     }
// }
// 策略模式：
const strategies = {
    isNonEmpty(value, errorMsg) {
        if (value === '') {
            return errorMsg;
        }
    },
    minLength(value, length, errorMsg) {
        if (value < length) {
            return errorMsg;
        }
    },
    isMobile(value, errorMsg) {
        if (!/^1([3|3|8|9][0-9]{9})$/.test(value)) {
            return errorMsg;
        }
    }
}
const Validator = function () {
    this.cache = [];
}
Validator.prototype.add = function (dom, rule, errorMsg) {
    let ary = rule.split(':');
    this.cache.push(function () {
        let strategy = ary.shift();
        ary.unshift(dom.value);
        ary.push(errorMsg);
        return strategies[strategy].apply(dom, ary);
    });
}
Validator.prototype.start = function () {
    for(let i=0, validatorFunc; validatorFunc = this.cache[i++];){
        let msg =validatorFunc();
        if(msg){
            return msg
        }
    }
}
let validator = new Validator();
validator.add(registerForm.userName, 'isNonEmpty', '用户名怎么能为空！')
validator.add(registerForm.password, 'minLength:6', '密码长度怎么不够！')
validator.add(registerForm.phoneNumber, 'isMobile', '手机号怎么写的格式？')
registerForm.onsubmit = function(){
   let msg =  validator.start();
   if(msg){
       alert(msg);
   }
}