import React from 'react';
import $ from 'jquery'
import axios from 'axios'

let _singleton = Symbol();
const IP_ADDRESS = 'http://localhost:8080'
//const IP_ADDRESS = 'https://memebook.herokuapp.com/'
class AdvertisementService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }
    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new AdvertisementService(_singleton);
        return this[_singleton]
    }


    findAllLocalAdvertisements(){
        return fetch(IP_ADDRESS + '/api/advertisement/findAllAdvertisements')
            .then(response =>
                response.json());
    }

    uploadAdvertisementImage(file,advertisement){

        let data = new FormData();

        data.append("file0", file[0], file[0].name);
        //data.append('advertisementName', advertisement.advertisementName);
        //data.append('advertisement', advertisement, "advertisement");

        data.append('advertisement', JSON.stringify(advertisement));

        const config = {
            headers: { 'content-type': 'multipart/form-data;boundary=gc0p4Jq0M2Yt08jU534c0p'}
        };
        axios.post(IP_ADDRESS + '/api/image/advertisement/uploadImage', data, config);
    }

}
export default AdvertisementService;