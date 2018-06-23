import React from 'react';
import axios from "axios/index";
import * as consts from "../Constants";

const IP_ADDRESS = consts.IP_ADDRESS

let _singleton = Symbol();
class EventService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }
    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new EventService(_singleton);
        return this[_singleton]
    }

    findEvents() {
        return fetch('https://www.eventbriteapi.com/v3/events/search/?token=TZCJ367TOE2VML42SMVX', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response =>
                response.json());
    }


    findAllLocalEvents() {
        return fetch(IP_ADDRESS + '/api/event/findAllEvents')
            .then(response =>
                response.json());
    }

    uploadEventImage(file,event) {

        let data = new FormData();

        data.append("file0", file[0], file[0].name);
        //data.append('advertisementName', advertisement.advertisementName);
        //data.append('advertisement', advertisement, "advertisement");

        data.append('event', JSON.stringify(event));

        const config = {
            headers: { 'content-type': 'multipart/form-data;boundary=gc0p4Jq0M2Yt08jU534c0p'}
        };
        axios.post(IP_ADDRESS + '/api/image/event/uploadImage', data, config);
    }

}
export default EventService;