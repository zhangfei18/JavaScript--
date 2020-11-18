/**
 * 建造者模式：顾明思议，其实就是讲多个类组合起来建造成一个复合类，并且注重建造的过程，这点是和工厂模式不同的地方
 */
// 发布简历：创建应聘者
let Human = function (params) {
    this.skill = params || params.skill || '保密';
    this.hobby = params || params.hobby || '保密';
}
Human.prototype = {
    getSkill() { },
    getHobby() { }
}
let Named = function (name) {
    let that = this;
    (function (name, that) {
        that.wholeName = name;
        if (name.indexOf(' ') > -1) {
            that.FirstName = name.slice(0, name.indexOf(' '));
            that.LastName = name.slice(name.indexOf(' '));
        }
    })(name, that)
}
let Work = function (work) {
    let that = this;
    (function (work, that) {
        switch (work) {
            case 'code': {
                // ...
            }
            case 'UI': {
                // ...
            }
        }
    })(work, that)
}
Work.prototype.changeWork = function (work) {
    this.work = work;
}
let Person = function (name, work) {
    let p = new Human();
    p.name = new Named(name);
    p.work = new Work(work);
}