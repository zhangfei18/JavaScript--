const Folder = function (name) {
    this.files = [];
    this.name = name;
    this.parent = null;
}
Folder.prototype.add = function (file) {
    file.parent = this;
    this.files.push(file);
}
Folder.prototype.scan = function () {
    console.log('开始扫描文件夹:', this.name);
    for (let i = 0, file; file = this.files[i++];) {
        file.scan;
    }
}
Folder.prototype.remove = function () {
    if (!this.parent) {
        return;
    }
    for (let files = this.parent.files, l = files.length - 1; l >= 0; l--) {
        let file = files[l];
        if (file === this) {
            files.splice(l, 1);
        }
    }
}
const File = function (name) {
    this.name = name;
    this.parent = null;
}
File.prototype.add = function () {
    throw new Error('文件下面不能添加文件！');
}
File.prototype.scan = function () {
    console.log('开始扫描文件：' + this.name);
};
File.prototype.remove = function () {
    if (!this.parent) {
        return;
    }
    for (let files = this.parent.files, l = files.length - 1; l >= 0; l--) {
        let file = files[l];
        if (file === this) {
            files.splice(l, 1);
        }
    }
}