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


    // canvas绘制图形验证码
    (function () {
        function Gcode(el, option) {
            this.el = typeof el === 'string' ? document.querySelector(el) : el;
            this.option = option;
            this.init();
        }
        Gcode.prototype = {
            constructor: Gcode,
            init: function () {
                if (this.el.getContext) {
                    isSupportCanvas = true;
                    var ctx = this.el.getContext('2d'),
                        // 设置画布宽高
                        cw = this.el.width = this.option.width || 200,
                        ch = this.el.height = this.option.height || 40,
                        textLen = this.option.textLen || 4,
                        lineNum = this.option.lineNum || 4;
                    var text = this.randomText(textLen);

                    this.onClick(ctx, textLen, lineNum, cw, ch);
                    this.drawLine(ctx, lineNum, cw, ch);
                    this.drawText(ctx, text, ch);
                }
            },
            onClick: function (ctx, textLen, lineNum, cw, ch) {
                var _ = this;
                this.el.addEventListener('click', function () {
                    text = _.randomText(textLen);
                    _.drawLine(ctx, lineNum, cw, ch);
                    _.drawText(ctx, text, ch);
                }, false)
            },
            // 画干扰线
            drawLine: function (ctx, lineNum, maxW, maxH) {
                ctx.clearRect(0, 0, maxW, maxH);
                for (var i = 0; i < lineNum; i++) {
                    var dx1 = Math.random() * maxW,
                        dy1 = Math.random() * maxH,
                        dx2 = Math.random() * maxW,
                        dy2 = Math.random() * maxH;
                    ctx.strokeStyle = 'rgb(' + 255 * Math.random() + ',' + 255 * Math.random() + ',' + 255 * Math.random() + ')';
                    ctx.beginPath();
                    ctx.moveTo(dx1, dy1);
                    ctx.lineTo(dx2, dy2);
                    ctx.stroke();
                }
            },
            // 画文字
            drawText: function (ctx, text, maxH) {
                var len = text.length;
                for (var i = 0; i < len; i++) {
                    var dx = 30 * Math.random() + 30 * i,
                        dy = Math.random() * 5 + maxH / 2;
                    ctx.fillStyle = 'rgb(' + 255 * Math.random() + ',' + 255 * Math.random() + ',' + 255 * Math.random() + ')';
                    ctx.font = '30px Helvetica';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(text[i], dx, dy);
                }
            },
            // 生成指定个数的随机文字
            randomText: function (len) {
                var source = ['a', 'b', 'c', 'd', 'e',
                    'f', 'g', 'h', 'i', 'j',
                    'k', 'l', 'm', 'o', 'p',
                    'q', 'r', 's', 't', 'u',
                    'v', 'w', 'x', 'y', 'z'];
                var result = [];
                var sourceLen = source.length;
                for (var i = 0; i < len; i++) {
                    var text = this.generateUniqueText(source, result, sourceLen);
                    result.push(text)
                }
                return result.join('')
            },
            // 生成唯一文字
            generateUniqueText: function (source, hasList, limit) {
                var text = source[Math.floor(Math.random() * limit)];
                if (hasList.indexOf(text) > -1) {
                    return this.generateUniqueText(source, hasList, limit)
                } else {
                    return text
                }
            }
        }
        new Gcode('#canvas_code', {
            lineNum: 6
        })
    })();
// 调用
new Gcode('#canvas_code', {
    lineNum: 6
})