import React from 'react';

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

}
export default EventService;