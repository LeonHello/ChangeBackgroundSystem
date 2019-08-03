var express = require('express');
var router = express.Router();
//获取项目工程里的图片
var fs = require('fs');//引用文件系统模块
var image = require("imageinfo"); //引用imageinfo模块
var formidable = require("formidable");
var path = require('path');

function readFileList(path, filesList) {
    var files = fs.readdirSync(path);
    files.forEach(function (itm, index) {
        var stat = fs.statSync(path + itm);
        if (stat.isDirectory()) {
            //递归读取文件
            readFileList(path + itm + "/", filesList)
        } else {

            var obj = {};//定义一个对象存放文件的路径和名字
            obj.path = path;//路径
            obj.filename = itm//名字
            filesList.push(obj);
        }

    })

}
var getFiles = {
    //获取文件夹下的所有文件
    getFileList: function (path) {
        var filesList = [];
        readFileList(path, filesList);
        return filesList;
    },
    //获取文件夹下的所有图片
    getImageFiles: function (path) {
        var imageList = [];

        this.getFileList(path).forEach((item) => {
            var ms = image(fs.readFileSync(item.path + item.filename));

            ms.mimeType && (imageList.push(item.filename))
        });
        return imageList;

    }
};

// /utils/getImgName
router.get('/getImgName', function (req, res, next) {
    let { category } = req.query;
    //文件夹路径
    var path = process.cwd() + "/source/" + category + "/";
    //获取文件夹下的所有图片
    var imageList = getFiles.getImageFiles(path);
    //获取文件夹下的所有文件
    // getFiles.getFileList("../source/");
    res.json({ status: 1, data: imageList });
});

// /utils/uploadImg
router.post('/uploadImg', (req, res, next) => {
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = path.join(process.cwd() + "/source/gallery/");
    form.keepExtensions = true;//保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;
    form.parse(req, function (err, fields, files) {
        // console.log(files.the_file);
        //do somthing......  
        var filename = files.the_file.name
        var nameArray = filename.split('.');
        var type = nameArray[nameArray.length - 1];
        var name = '';
        for (var i = 0; i < nameArray.length - 1; i++) {
            name = name + nameArray[i];
        }
        var date = new Date();
        var time = '_' + date.getFullYear() + "_" + (date.getMonth() + 1) + "_" + date.getDate() + "_" + date.getHours() + "_" + date.getMinutes();
        var newName = name + time + '.' + type;
        var newPath = form.uploadDir + "/" + newName;
        fs.renameSync(files.the_file.path, newPath);  //移动并重命名
        res.json({ data: true, status: 200, imgName: newName });
    })
});

module.exports = router;
