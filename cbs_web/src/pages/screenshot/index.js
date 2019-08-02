import React from 'react';
import { message } from 'antd';
import 'whatwg-fetch';
import kscreenshot from 'kscreenshot';


class Screenshot extends React.Component {
    state = {

    };

    uploadImg = () => {
        fetch(`/api/utils/uploadImg`, {
            body: JSON.stringify({
                flag: true,
            }),
            cache: 'no-cache',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(response => response.json())
            .then(res => {
                if(res.data === true) {
                    message.success("截图上传至服务器成功！");
                }
                else{
                    message.error("截图上传至服务器失败！");
                }
            });
    }

    componentDidMount() {
        //65指键盘中的A
        new kscreenshot(
            {
                key: 65,
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
                endCB: (value) => {
                    console.log("valuesss: "+value);
                    this.uploadImg();
                },
            }
        );
    }

    render() {
        return (
            <div>
                截屏测试
        </div>
        )
    }
}


export default Screenshot;