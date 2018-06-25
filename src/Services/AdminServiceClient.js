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
            headers: { 'content-type': 'application-type' }
        })
            .then(response => response.json());
    }

    findAllMemes() {
        return fetch(IP_ADDRESS + '/api/meme/findAllMemes')
            .then(
                response => response.json()
            )
    }
}