import { userData } from "./getUserData.js";

const host = "http://localhost:3030";

async function requester(method, url, data){

    const option = {
        method,
        headers: {},
    }
    if(data){
        option.headers['Content-Type'] = 'application/json';
        option.body = JSON.stringify(data);
    }

    const userInfo = userData.getUserData();
    console.log(userInfo);
    if(userInfo){
        option.headers['x-authorization'] = userInfo.accessToken;
    }
    try {
        const response = await fetch(host + url, option);
        if(response.ok === false){
            const error = await response.json();
            throw new Error(error.message)
        }
        if(response.status === 204){
            return response;

        }
    } catch (error) {
        alert(error.message);
        throw new Error(error)
    }
}

export function get(url) {
    return requester('GET', url);
}
export function post(url, data) {
    return requester('POST', url, data);
}
export function put(url) {
    return requester('PUT', url, data);
}
export function del(url) {
    return requester('DELETE', url);
}