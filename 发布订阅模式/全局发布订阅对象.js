// 反柯理化

Function.prototype.uncurring = function () {
    const self = this;
    return function () {
        return Function.prototype.call.apply(self, arguments);
    }
}

// 发布-订阅
const Event = (function () {
    let global = this, Event, _default = 'default';
    Event = function () {
        let _listen,
            _trigger,
            _remove,
            _slice = Array.prototype.slice.uncurring(),
            _shift = Array.prototype.shift.uncurring(),
            _unshift = Array.prototype.unshift.uncurring(),
            namespaceCache = {},
            _create,
            find,
            each = function (ary, fn) {
                let ret;
                for (let i = 0, l = ary.length; i < l; i++) {
                    let n = ary[i];
                    ret = fn.call(n, i, n);
                }
            };
        _listen = function (key, fn, cache) {
            if (!cache[key]) {
                cache[key] = [];

            }
            cache[key].push(fn);
        };
        _remove = function (key, fn, cache) {
            if (cache[key]) {
                if (fn) {
                    for (let i = cache[key].length; i >= 0; i--) {
                        if (cache[key][i] === fn) {
                            cache[key].splice(i, 1);
                        }
                    }
                } else {
                    cache[key] = [];
                }
            }
        };
        _trigger = function () {
            let cache = _shift(arguments);
            let key = _shift(arguments);
            let args = arguments;
            let _self = this;
            let ret;
            let stack = cache[key];
            if (!stack || !stack.length) {
                return;
            }
            return each(stack, function () {
                return this.apply(_self, args)//监听的事件执行
            })
        };
        _create = function (namespace) {
            namespace = namespace || _default;
            let cache = {};//事件列表
            let offlineStack = [];
            let ret = {
                listen: function (key, fn, last) {
                    _listen(key, fn, cache);
                    if (offlineStack === null) {
                        return;
                    }
                    // 执行离线缓存中的
                    if (last === 'last') {
                        offlineStack.length && offlineStack.pop()();
                    } else {
                        each(offlineStack, function () {
                            this();//在each方法中 改变this的指向，使得此处的this指向offlineStack中的每一项fn函数
                        });
                    }
                    offlineStack = null;
                },
                one: function (key, fn, last) {
                    _remove(key, cache);
                    this.listen(key, fn, last);
                },
                remove(key, fn) {
                    _remove(key, cache, fn);
                },
                trigger: function () {
                    let fn,
                        args,
                        _self = this;
                    _unshift(arguments, cache);
                    args = arguments;
                    fn = function () {
                        return _trigger.apply(_self, args);
                    };
                    // 存入离线缓存
                    if (offlineStack) {
                        return offlineStack.push(fn);
                    }
                    return fn();
                }
            };
            //  单例
            return namespace ? (namespaceCache[namespace] ? namespaceCache[namespace] : namespaceCache[namespace] = ret) : ret;

        };
        return {
            craete: _create,
            one: function (key, fn, last) {
                let event = this.create();
                event.one(key, fn, last);
            },
            remove: function (key, fn) {
                let event = this.create();
                event.remove(key, fn);
            },
            listen: function (key, fn) {
                let event = this.create();
                event.listen(key, fn);
            },
            trigger: function () {
                let event = this.create();
                event.trigger.apply(this, arguments);
            },

        }
    }();
    return Event;
})();