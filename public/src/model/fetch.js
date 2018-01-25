import fetch from 'whatwg-fetch';

//noinspection JSUnusedGlobalSymbols
export default (server, body) => {
    const {method, resource} = body;
    body.method = method || 'POST';
    if (!resource) {
        throw new Error('undefined resource');
    }
    return fetch(server, {
        headers: {
            'Content-Type'  : 'application/json',
            'Json-Web-Token': '',
        },
        method : 'POST',
        body   : JSON.stringify(body),
    }).then(response => {
        if (response.status === 200) {
            return response.json();
        } else {
            console.log(response.statusText);
        }
    });
};