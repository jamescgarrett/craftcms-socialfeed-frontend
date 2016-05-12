'use strict';

var ApiUtils = {};

ApiUtils.loadData = function (url, sendback) {
    var request = new Request(url, {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    });

    fetch(request).then((response) => {
        return response.json();
    }).then((data) => {
        sendback(data);
    }).catch((err) => {
        throw new Error(err);
    });
};

module.exports = ApiUtils;
