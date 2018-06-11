import React from 'react';

let _singleton = Symbol();
class MemeService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }
    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new MemeService(_singleton);
        return this[_singleton]
    }

    findAllMemes(pageNumber, type) {
        return fetch('https://api.imgur.com/3/gallery/hot/'+ type + '/' + pageNumber + '.json')
            .then(response =>
                response.json());
    }

}
export default MemeService;