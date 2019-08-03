import React from 'react';
import 'whatwg-fetch';
import style from './index.css';
// import NaturalGallery from 'natural-gallery-js';


class Gallery extends React.Component {
    state = {
        category: "gallery",
        imageFilesNameList: []
    };

    //不可用
    componentDidMount() {
        fetch(`/api/utils/getImgName?category=${this.state.category}`)
            .then(response => response.json())
            .then(res => {
                this.setState({
                    imageFilesNameList: res.data,
                })
            });
        // window.addEventListener('load', function () {

        //     // Get reference of gallery container
        //     var elementRef = document.getElementById('gallery');

        //     // Init gallery according to wanted format
        //     var gallery = new NaturalGallery.Natural(elementRef);

        //     // Convert your format into natural-gallery's format.
        //     var items = [
        //         {
        //             thumbnailSrc: '/yay.jpg', // link to thumbnail image
        //             enlargedSrc: '/yay.jpg', // link to enlarged image
        //             enlargedWidth: 100,
        //             enlargedHeight: 100,
        //             title: "pig", // Title for the label or button
        //             link: "string", // Link, transforms label into button
        //             linkTarget: "string", // _blank | _top | _self | _parent
        //             color: "blue" // HEX color for background before image display
        //         }
        //     ];

        //     // Set the entire collection
        //     gallery.setItems(items);

        //     // Increment an existing collection.
        //     // gallery.addItems(itemsSet1); // the first call as the same effect as setItems()
        //     // gallery.addItems(itemsSet2);
        //     // gallery.addItems(itemsSet3);
        // });

    }

    render() {
        const { category, imageFilesNameList } = this.state;
        console.log(imageFilesNameList);
        return (
            <div id="gallery">
                {imageFilesNameList.map((value) => {
                    value = "/api/" + category + "/" + value;
                    return <img class={style["img-style"]} src={value} alt="" />
                })}
            </div>
        );
    }

}

export default Gallery;
