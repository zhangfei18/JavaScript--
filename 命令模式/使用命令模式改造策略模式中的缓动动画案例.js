import Animate from "../策略模式/缓动动画.js";
const ball = document.querySelector('#div');
const pos = document.querySelector('#pos');
const moveBtn = document.querySelector('#moveBtn');
const cancelBtn = document.querySelector('#cancelBtn');
// moveBtn.onclick = function(){
//     console.log(11)
//     let animate = new Animate(ball);
//     animate.start('left', pos.value, 1000, 'strongEaseOut');
// }
// 使用命令模式
const MoveCommand = function (receiver, pos) {
    this.receiver = receiver;
    this.pos = pos;
    this.oldPos = null;
}
MoveCommand.prototype.execute = function () {
    this.receiver.start('left', this.pos, 1000, 'strongEaseOut');
    this.oldPos = this.receiver.dom.getBoundingClientRect()[this.receiver.propertyName];
}
MoveCommand.prototype.undo = function () {
    console.log(this.oldPos)
    this.receiver.start('left', this.oldPos, 1000, 'strongEaseOut');
}
let moveCommand
moveBtn.onclick = function () {
    let animate = new Animate(ball);
    moveCommand = new MoveCommand(animate, pos.value);
    moveCommand.execute();
}
cancelBtn.onclick = function () {
    moveCommand.undo()
}