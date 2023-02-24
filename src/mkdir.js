var fs = require('fs');
var path = require('path');
exports.mkdirSync = function (dirPath) {
    if (dirPath == null || dirPath == "") return;
    dirPath = exports.isAbsolute(dirPath) ? path.normalize(dirPath) : path.join(process.cwd(), dirPath);
    if (fs.existsSync(dirPath)) return;

    var arr = dirPath.split(path.sep);
    var index = arr.length - 1;
    var tempStr = arr[index];
    while (tempStr == "" && arr.length > 0) {
        index--;
        tempStr = arr[index];
    }
    if (tempStr == "") return;
    var newPath = dirPath.substring(0, dirPath.length - tempStr.length - 1);
    if (!fs.existsSync(newPath)) exports.mkdirSync(newPath);
    fs.mkdirSync(dirPath);
};

exports.isAbsolute = function (filePath) {
    filePath = path.normalize(filePath);
    if (filePath.substring(0, 1) == "/") return true;
    if (filePath.search(/[\w]+:/) == 0) return true;
    return false;
};