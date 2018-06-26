import React from 'react';
import $ from 'jquery'
import axios from 'axios'
import * as consts from '../Constants';
import cookie from 'react-cookies'

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

    logout() {
        return fetch(IP_ADDRESS + '/logout')
            .then(response => console.log(response));
    }

    findProfileByUserId(userId){

        var type = cookie.load('role');

        if(type == 'MEME_USER'){
            return fetch(IP_ADDRESS + '/api/meme/getMemeUserById/' + userId)
                .then(response =>
                    response.json());
        }
        if(type == 'EVENT_USER'){
            return fetch(IP_ADDRESS + '/api/event/getEventUserById/' + userId)
                .then(response =>
                    response.json());
        }
        if(type == 'ADV_USER'){
            return fetch(IP_ADDRESS + '/api/advertisement/getAdvertisementUserById/' + userId)

                .then(response =>
                    response.json());
        }
    }

    updateProfileByUserId(user){

        var type = cookie.load('role');

        if(type == 'MEME_USER'){
            return fetch(IP_ADDRESS + '/api/meme/updateMemeUser',{
                method : 'post',
                body : JSON.stringify(user),
                headers : {
                    'content-type':'application/json'
                }

            }).then(response =>
                    response.json());
        }
        if(type == 'EVENT_USER'){
            return fetch(IP_ADDRESS + '/api/event/updateEventUser',{
                method : 'post',
                body : JSON.stringify(user),
                headers : {
                    'content-type':'application/json'
                }
            }).then(response =>
                    response.json());
        }
        if(type == 'ADV_USER'){
            return fetch(IP_ADDRESS + '/api/advertisement/updateAdvUser',{
                method : 'post',
                body : JSON.stringify(user),
                headers : {
                    'content-type':'application/json'
                }
            }).then(response =>
                    response.json());
        }



    }


    uploadProfilePicture(file){

        let data = new FormData();

        data.append("file0", file[0], file[0].name);

        const config = {
            headers: { 'content-type': 'multipart/form-data;boundary=gc0p4Jq0M2Yt08jU534c0p' }
        };
        return axios.post(IP_ADDRESS + '/api/image/user/uploadProfilePicture', data, config);

    }

    addFollowing(userId){
        var sUser = cookie.load('userId');
        var tUser = userId

        return fetch(IP_ADDRESS + '/api/user/addfollowing?sUser=' + sUser + '&tUser='+ tUser)
            .then(response => console.log(response));


    }


    deleteFollowing(userId){
        var sUser = cookie.load('userId');
        var tUser = userId

        return fetch(IP_ADDRESS + '/api/user/deletefollowing?sUser=' + sUser + '&tUser='+ tUser)
            .then(response => console.log(response));


    }

    addEventFollowing(eventId){
        var userId = cookie.load('userId');

        return fetch(IP_ADDRESS + '/api/user/addInterestUser?userId=' + userId + '&eventId='+ eventId)
            .then(response => console.log(response));
    }

    findAllUsers(){

            return fetch(IP_ADDRESS + '/api/user/findUsers')
                .then(response =>
                    response.json());


    }
}