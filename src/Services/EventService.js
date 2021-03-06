import React from 'react';
import axios from "axios/index";
import * as consts from "../Constants";
import cookie from 'react-cookies'

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
        return fetch('https://www.eventbriteapi.com/v3/venues/49350593/events/?token=Y5DMGQJ633FT5LMDYDKQ', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response =>
                response.json());
    }

    findEventsTicketmaster(pageNumber) {
        // const location = document.data.location;
        // console.log("location is" + location)
        let url = 'https://app.ticketmaster.com/discovery/v2/events?apikey=mbhXYkvELv2vd4HCj3pRW9WB21KArbI5&locale=*'
        var location = ""
        if (pageNumber){
            url = url + "&page=" + pageNumber + "&size=200&sort=date,desc"
        }
        return fetch(url, {
            method: 'GET',
        }).then(response =>
                response.json());
    }

    findAllLocalEvents() {
        return fetch(IP_ADDRESS + '/api/event/findAllEvents')
            .then(response =>
                response.json());
    }

    uploadEventImage(file,event) {

        let data = new FormData();
        var userId = cookie.load('userId')

        data.append("file0", file[0], file[0].name);
        //data.append('advertisementName', advertisement.advertisementName);
        //data.append('advertisement', advertisement, "advertisement");

        data.append('event', JSON.stringify(event));
        data.append('userId', userId);

        const config = {
            headers: { 'content-type': 'multipart/form-data;boundary=gc0p4Jq0M2Yt08jU534c0p'}
        };
        return axios.post(IP_ADDRESS + '/api/image/event/uploadImage', data, config);
    }

    deleteEvent(eventId){

        return fetch(IP_ADDRESS + '/api/event/'+ eventId,{
            method : 'delete'
        })
            .then(response => console.log(response));

    }

}
export default EventService;