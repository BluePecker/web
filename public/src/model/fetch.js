import 'whatwg-fetch';
import cookie from 'cookie';
//noinspection JSUnusedGlobalSymbols
export default (server, body) => {
    const {method, resource} = body;
    body.method = method || 'POST';
    if (!resource) {
        throw new Error('undefined resource');
    }
    let headers = {
        'Content-Type': 'application/json',
    };
    const {token} = cookie.parse(document.cookie);
    token && (headers['Json-Web-Token'] = token);
    return fetch(server, {
        headers,
        method: 'POST',
        body  : JSON.stringify(body),
    }).then(response => {
        if (response.status === 200) {
            return response.json();
        } else {
            throw new Error(response.statusText);
        }
    });
};