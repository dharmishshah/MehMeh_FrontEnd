import React from 'react';
import $ from 'jquery'
import axios from 'axios'
import * as consts from '../Constants';

let _singleton = Symbol();
 const IP_ADDRESS = consts.IP_ADDRESS

export default class UserService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new UserService(_singleton);
        return this[_singleton]
    }

    login(username, password){

        return fetch(IP_ADDRESS + '/api/user/login', {
            method: 'post',
            body: JSON.stringify({
                username: username,
                password: password
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then( response =>
                response.json()
            );
    }

    socialLogin(username) {
        return fetch( IP_ADDRESS + '/api/user/socialLogin?username=' + username)
            .then( response =>
                response.json());
    }

    register(user) {
        return fetch(IP_ADDRESS + '/api/user/register', {
            method: 'post',
            body: JSON.stringify(user),
            headers: { 'content-type': 'application/json' }
        })
            .then(response =>
                response.json());
    }


    findProfileByUserId(userId){

        return fetch(IP_ADDRESS + '/api/user/getUserByUserId/' + userId)
            .then(response =>
                response.json());


    }
}