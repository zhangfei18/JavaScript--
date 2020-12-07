// ***普通写法：
let id = 0;
// window.startUpload = function (uploadType, files) {
//     for (let i = 0, file; file = files[i++];) {
//         let uploadObj = new Upload(uploadType, file.fileName, file.fileSize);
//         uploadObj.init(id++);
//     }
// }
// const Upload = function (uploadType, fileName, fileSize) {
//     this.uploadType = uploadType;
//     this.fileName = fileName;
//     this.fileSize = fileSize;
//     this.dom = null;
// }
// Upload.prototype.init = function (id) {
//     let that = this;
//     this.id = id;
//     this.dom = document.createElement('div');
//     this.dom.innerHTML = `<span>文件名称:${this.fileName}, 文件大小:${this.fileSize}</span><button class="delFile">删除</button>`;
//     this.dom.querySelector('.delFile').onclick = function () {
//         that.delFile();
//     }
//     document.body.appendChild(this.dom);
// }
// Upload.prototype.delFile = function () {
//     if (this.fileSize < 3000) {
//         return this.dom.parentNode.removeChild(this.dom);
//     }
//     if (window.confirm('确定要删除该文件吗?' + this.fileName)) {
//         return this.dom.parentNode.removeChild(this.dom);
//     }
// };

// ***享元模式-重构文件上传
/**
 *  学习完这个例子后，学到了（也算是解开了以前的一个困惑吧）对于同一个构造函数如果我们既想使用单例模式但是这个实例对象需要有不同的状态变量，此时
 * 我们可以将这些状态抛离在构造函数的外面，然后声明一个方法当我们在使用实例时需要用到这写外部的状态时将其一个个赋值给这个实例；
 */
const Upload = function (uploadType) {
    this.uploadType = uploadType;
}
Upload.prototype.delFile = function (id) {
    uploadManager.setExternalState(id, this);
    if (this.fileSize < 3000) {
        return this.dom.parentNode.removeChild(this.dom);
    }
    if (window.confirm('确定要删除该文件吗?' + this.fileName)) {
        return this.dom.parentNode.removeChild(this.dom);
    }
}
// 工厂
const UploadFactory = (function () {
    const createdFlyWeightObjs = {};
    return {
        create: function (uploadType) {
            if (createdFlyWeightObjs[uploadType]) {
                return createdFlyWeightObjs[uploadType];
            }
            // 创建实例
            return createdFlyWeightObjs[uploadType] = new Upload(uploadType);//写到此处时感觉自己的设计模式体系要慢慢的构建起来了
        }
    }
})();
const uploadManager = (function () {
    let uploadDatabase = {};//存储外部状态变量的对象
    return {
        add: function (id, uploadType, fileName, fileSize) {
            let flyWeightObj = UploadFactory.create(uploadType);//Upload实例
            let dom = document.createElement('div');
            dom.innerHTML = `<span>文件名称:${this.fileName}, 文件大小:${this.fileSize}</span><button class="delFile">删除</button>`;
            dom.querySelector('.delFile').onclick = function () {
                flyWeightObj.delFile(id);
            }
            document.body.appendChild(dom);
            uploadDatabase[id] = {
                fileSize: fileSize,
                fileName: fileName,
                dom: dom
            }
            return flyWeightObj;
        },
        // 设置外部的状态变量的方法，
        setExternalState: function (id, flyWeightObj) {
            let uploadData = uploadDatabase[id];
            for (let i in uploadData) {
                flyWeightObj[i] = uploadData[i];
            }
        }
    }
})();
let id = 0;
window.startUpload = function (uploadType, files) {
    for (let i = 0, file; file = files[i++];) {
        let uploadObj = uploadManager.add(++id, uploadType, file.fileName, file.fileSize);
    }
}

// 创建三个插件上传对象和三个Flash上传对象
startUpload('plugin', [
    {
        fileName: '1.txt',
        fileSize: 1000
    },
    {
        fileName: '2.html',
        fileSize: 3000
    },
    {
        fileName: '3.txt',
        fileSize: 5000
    },
]);
startUpload('flash', [
    {
        fileName: '4.txt',
        fileSize: 1000
    },
    {
        fileName: '5.html',
        fileSize: 3000
    },
    {
        fileName: '6.txt',
        fileSize: 5000
    },
])