import React from 'react';
import $ from 'jquery'
import axios from 'axios'
import * as consts from '../Constants';

let _singleton = Symbol();
const IP_ADDRESS = consts.IP_ADDRESS

export default class AdminServiceClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new AdminServiceClient(_singleton);
        return this[_singleton]
    }

    findAllUsers() {
        return fetch(IP_ADDRESS + '/api/user/findUsers')
            .then(response => response.json())
    }

    deleteUser(userId) {
        return fetch(IP_ADDRESS + '/api/user/deleteUser/' + userId, {
            method: 'delete',
            headers: { 'content-type': 'application/json' }
        })
            .then(response => response.json());
    }

    findAllMemes() {
        return fetch(IP_ADDRESS + '/api/meme/findAllMemes')
            .then(
                response => response.json()
            )
    }

    deleteMeme(memeId) {
        return fetch(IP_ADDRESS + '/api/meme/' + memeId, {
            method: 'delete',
            headers: { 'content-type': 'application/json'}
        });
    }

    findAllEvents() {
        return fetch(IP_ADDRESS + '/api/event/findAllEvents')
            .then(response => response.json())
    }

    deleteEvent(eventId) {
        return fetch(IP_ADDRESS + '/api/event/' + eventId, {
            method: 'delete',
            headers: { 'content-type': 'application/json'}
        });
    }

    findAllAds() {
        return fetch(IP_ADDRESS + '/api/advertisement/findAllAdvertisements')
            .then(response => response.json())
    }

    deleteAds(adsId) {
        return fetch(IP_ADDRESS + '/api/advertisement/' + adsId, {
            method: 'delete',
            headers: { 'content-type': 'application/json'}
        });
    }
}