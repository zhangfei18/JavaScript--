const tween = {
    linear: function (t, b, c, d) {
        return c * t / d + b;
    },
    easeIn: function (t, b, c, d) {
        return c * (t /= d) * t + b;
    },
    strongEaseIn: function (t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
    },
    strongEaseOut: function (t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    sineaseIn: function (t, b, c, d) {
        return c * (t /= d) * t * t + b;
    },
    sieaseOut: function (t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    }
}

let Animate = function (dom) {
    this.dom = dom;
    this.startTime = 0;
    this.startPos = 0;
    this.endPos = 0;
    this.propertyName = null;
    this.easing = null;
    this.duration = null;
}
Animate.prototype.start = function (propertyName, endPos, duration, easing) {
    this.startTime = +new Date();
    this.propertyName = propertyName;
    // 获取dom元素的开始位置
    this.startPos = this.dom.getBoundingClientRect()[propertyName];
    this.endPos = endPos;
    this.duration = duration;
    this.easing = tween[easing];
    let timeId = null;
    let self = this;
    console.log(timeId)
    if(timeId) return;
    timeId = setInterval(() => {
        if (self.step() === false) {
            clearInterval(timeId);
            timeId = null;
        }
    }, 19);
}
Animate.prototype.step = function () {
    let t = +new Date();
    if (t >= this.startTime + this.duration) {
        this.update(this.endPos);
        return false;
    }
    console.log(this.startPos, this.endPos)
    let pos = this.easing(t - this.startTime, Number(this.startPos), Number(this.endPos) , this.duration);
    this.update(pos)
}
Animate.prototype.update = function (pos) {
    this.dom.style[this.propertyName] = pos + 'px';
}
// const oDiv = document.querySelector('#div');
// const animate = new Animate(oDiv);
// animate.start('top', 500, 2000, 'sieaseOut');
export default Animate;