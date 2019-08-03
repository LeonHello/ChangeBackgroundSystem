import React from 'react';
import { Button, message } from 'antd';
import 'whatwg-fetch';
import kscreenshot from 'kscreenshot';


class Screenshot extends React.Component {
    state = {

    };

    dataURItoBlob = (base64Data) => {
        var byteString;
        if (base64Data.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(base64Data.split(',')[1]);
        else
            byteString = unescape(base64Data.split(',')[1]);
        var mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ia], { type: mimeString });
    }

    uploadImg = (fd) => {
        fetch(`/api/utils/uploadImg`, {
            method: 'POST',
            body: fd,
            // cache: 'no-cache',
            // credentials: 'include',
            // headers: {
            //     'Content-Type': 'application/json'
            // },
        }).then(response => response.json())
            .then(res => {
                console.log(res);
                if (res.data === true) {
                    message.success("截图上传至服务器成功！");
                }
                else {
                    message.error("截图上传至服务器失败！");
                }
            });
    }

    componentDidMount() {
        new kscreenshot(
            {
                key: 65,//65指键盘中的A
                toolShow: {
                    complete: true,
                    quit: true,
                    back: false,
                    arrow: false,
                    drawLine: false,
                    rect: false,
                    ellipse: false,
                    text: false,
                    color: false,
                },
                needDownload: false,//完成后是否下载
                endCB: (img) => {
                    console.log(img);
                    var blob = this.dataURItoBlob(img);//base64转二进制
                    var fd = new FormData(document.forms[0]);
                    fd.append("the_file", blob, 'image.png');//构建formdata
                    this.uploadImg(fd);//fetch请求
                },
            }
        );
    }

    render() {
        return (
            <div>
                <Button>
                    截图
                </Button>
            </div>
        )
    }
}


export default Screenshot;