import React from 'react';
import $ from 'jquery'
import axios from 'axios'
import * as consts from "../Constants";
import cookie from "react-cookies";

let _singleton = Symbol();

const IP_ADDRESS = consts.IP_ADDRESS
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
        var userId = cookie.load('userId')

        data.append("file0", file[0], file[0].name);
        //data.append('advertisementName', advertisement.advertisementName);
        //data.append('advertisement', advertisement, "advertisement");

        data.append('advertisement', JSON.stringify(advertisement));
        data.append('userId', userId);

        const config = {
            headers: { 'content-type': 'multipart/form-data;boundary=gc0p4Jq0M2Yt08jU534c0p'}
        };
        return axios.post(IP_ADDRESS + '/api/image/advertisement/uploadImage', data, config);
    }

    deleteAd(adId){

        return fetch(IP_ADDRESS + '/api/advertisement/'+ adId,{
            method : 'delete'
        })
            .then(response => console.log(response));

    }

}
export default AdvertisementService;