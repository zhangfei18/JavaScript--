// 1.构造器
// 我们都知道在JavaScript中使用构造函数就可以创建很多的对象（实例），例如：
function User(name, age, career) {
    this.name = name;
    this.age = age;
    this.career = career;
}
const user1 = new User('zf', 23, 'web');
// 上面的好处就是再也不用使用字面量的方式创建一个个的对象了，只需new 构造函数就OK了;
// 变与不变：不变的是每个对象都有这三个属性name\age\career, 变的是这三个属性的取值。
// 2.简单工厂模式：
// 假如上面的每个User出来的对象要求固定的career都要有固定的work，那么我们是不是要多加一个构造器了？
function Coder(name, age) {
    this.name = name;
    this.age = age;
    this.career = 'coder';
    this.work = ['写代码', '修bug']
}
function ProductManager(name, age) {
    this.name = name;
    this.age = age;
    this.career = 'product manager';
    this.work = ['定会议室', '催更']
}
// 如果我们再多加一个工种呢？是不是要写更多的类？然后再想下面这样，写一个函数将变化的部分交给这个函数去判断：
function Factory(name, age, career) {
    switch (career) {
        case 'coder':
            return new Coder(name, age)
            break
        case 'product manager':
            return new ProductManager(name, age)
            break;
    }
}
// nonono,还是那个原则，将变化的部分与不变的部分抽离加封装
function User(name, age, career, work) {
    this.name = name;
    this.age = age;
    this.career = career;
    this.work = work;
}
function Factory(name, age, career) {
    let work;
    switch (career) {
        case 'coder':
            work = ['写代码', '修bug']
            break
        case 'product manager':
            work = ['定会议室', '催更']
            break
        case 'XXX':
        // ...其他工种
    }
    return new User(name, age, career, work);
}
/**
 * 总结：
 * 工厂模式的目的就是实现无脑传参！
 * 应用场景：
 * 有构造函数的地方就要想到工厂模式
 * [构造器]解决的是多个[对象实例]的问题，[简单工厂]解决的是多个[类]的问题
 */