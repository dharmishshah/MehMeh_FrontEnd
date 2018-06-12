import React from 'react';
import $ from 'jquery'
import axios from 'axios'

let _singleton = Symbol();
class MemeService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }
    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new MemeService(_singleton);
        return this[_singleton]
    }

    findAllMemes(pageNumber, type) {
        return fetch('https://api.imgur.com/3/gallery/hot/'+ type + '/' + pageNumber + '.json')
            .then(response =>
                response.json());
    }

    findAllLocalMemes(){
        return fetch('http://localhost:8080/api/meme/findAllMemes')
            .then(response =>
                response.json());
    }

    // uploadImage(file){
    //
    //     var file = new FormData();
    //     file.append('file0', file[0]);
    //     $.ajax({
    //         url: 'http://localhost:8080/api/image/meme/uploadImage',
    //         data: file,
    //         processData: false,
    //         contentType: false,
    //         type: 'POST',
    //         success: function(data){
    //             alert(data);
    //         }
    //     });
    // }

    uploadImage(file,caption){

        let data = new FormData();

        data.append("file0", file[0], file[0].name);
        data.append('caption', caption);

        const config = {
            headers: { 'content-type': 'multipart/form-data;boundary=gc0p4Jq0M2Yt08jU534c0p' }
        };
        axios.post("http://localhost:8080/api/image/meme/uploadImage", data, config);
    }

}
export default MemeService;