var express = require('express');
var router = express.Router();
//获取项目工程里的图片
var fs = require('fs');//引用文件系统模块
var image = require("imageinfo"); //引用imageinfo模块
var formidable = require("formidable");

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

// /utils/getPictureName
router.get('/getPictureName', function (req, res, next) {
    console.log(req.query);
    let {category} = req.query;
    //文件夹路径
    var path = process.cwd() + "/source/" + category + "/";
    //获取文件夹下的所有图片
    var imageList = getFiles.getImageFiles(path);
    //获取文件夹下的所有文件
    // getFiles.getFileList("../source/");
    res.json({ status: 1, data: imageList });
});

// /utils/handle
router.post('/handle', (req, res, next) => {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        console.log(err);
        console.log('fields', fields);//表单传递的input数据  
        console.log('files', files);//上传文件数据  
        //do somthing......  
        res.json({});
    })
});

module.exports = router;
