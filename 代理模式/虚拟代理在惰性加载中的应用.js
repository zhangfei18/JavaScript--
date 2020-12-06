let miniConsole = (function () {
    let cache = [];
    let handler = function (ev) {
        if (ev.keyCode === 123) {
            let script = document.createElement('script');
            script.onload = function () {
                for (let i = 0, fn; fn = cache[i++];) {
                    fn();
                }
            };
            script.src = './miniConsole.js';
            document.getElementsByTagName('head')[0].appendChild(script);
            document.body.removeEventListener('keydown', handler, false);

        }
    };
    document.body.addEventListener('keydown', handler, false);
    return {
        log() {
            let args = arguments;//需要打印的参数
            cache.push(function () {
                return miniConsole.log.apply(miniConsole, args);
            })
        }
    }
})();
miniConsole.log(1)