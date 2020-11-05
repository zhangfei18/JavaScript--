import HttpUtils from "./HttpUtils"
/**
 * 适配器模式：
 * 使用场景：实际接口和目标接口不匹配的尴尬
 */

//  伪代码：
// 上面引入的为现同事写的信的基于fetch的请求方法
// 下面为原始同事基于XMLHttpRequest法封装的请求方法
function Ajax(type, url, data, success, failed) {
    // ...业务代码

}
Ajax('get', url地址, post参数, function (data) { }, function (arror) { });
// 一看旧同事的方法需要这么多参数就可以看出来和新同事的方法很不兼容
// 因此采用适配器模式：
// 因为Ajax是老同事的方法，因此我们不能改他的方法名，因为要改方法名那么就要随着改调用这个方法的所有代码，因此适配器再合适不过了。 
async function AjaxAdapter(type, url, data, success, failed) {
    const type = type.toUpperCase();
    let result;
    if (type === 'GET') {
        result = await HttpUtils.get(url) || {};
    } else if (type === "POST") {
        result = await HttpUtils.post(url, data) || {};
    }
    // 假设请求成功对应的状态码是1
    result.statusCode === 1 && success ? success(result) : failed(result.statusCode)
}
// 使用适配器：
async function Ajax(type, url, data, success, failed) {
    await AjaxAdapter(type, url, data, success, failed);
}

