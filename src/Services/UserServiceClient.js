import React from 'react';
import $ from 'jquery'
import axios from 'axios'

let _singleton = Symbol();
// const IP_ADDRESS = 'http://localhost:8080'
const IP_ADDRESS = 'https://memebook.herokuapp.com'
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
        return fetch(IP_ADDRESS + '/login', {
            method: 'post',
            body: {
                username: username,
                password: password
            },
            headers: { 'content-type': 'application/json' }
        })
            .then(response =>
                response.json());
    }

    socialLogin(username) {
        return fetch( IP_ADDRESS + '/socialLogin', {
            method: 'get',
            body: {
                username: username
            },
            headers: { 'content-type': 'application/json' }
        })
            .then( response =>
                response.json());
    }

    register(user) {
        return fetch(IP_ADDRESS + '/register', {
            method: 'post',
            body: JSON.stringify(user),
            headers: { 'content-type': 'application/json' }
        })
            .then(response =>
                response.json());
    }
}