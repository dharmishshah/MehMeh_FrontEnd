import React from 'react';
import $ from 'jquery'
import axios from 'axios'
import * as consts from "../Constants";

let _singleton = Symbol();

const IP_ADDRESS = consts.IP_ADDRESS

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

        return fetch('https://api.imgur.com/3/gallery/hot/'+ type + '/' + pageNumber + '.json',{
            headers :{ Authorization : 'Client-ID cf6af4fa4c67435'}
        })
            .then(response =>
                response.json());


    }

    findAllLocalMemes(){
        return fetch(IP_ADDRESS + '/api/meme/findAllMemes')
            .then(response =>
                response.json());
    }

    uploadImage(file,caption){

        let data = new FormData();

        data.append("file0", file[0], file[0].name);
        data.append('caption', caption);

        const config = {
            headers: { 'content-type': 'multipart/form-data;boundary=gc0p4Jq0M2Yt08jU534c0p' }
        };
        axios.post(IP_ADDRESS + '/api/image/meme/uploadImage', data, config);
    }

}
export default MemeService;
