import axios from 'axios';
// https://jsonplaceholder.typicode.com/todos/1

const OUR_OWN_API = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
    timeout: 10000,
});

const execute =  async (method, url, {...options} = {}, retry = false) => {
    try {
        const {status, data} = await  OUR_OWN_API({
            method,
            url: url,
            ...options
        })
        return {status, data};
    } catch(error) {
        const {response:{status}} = error || {};
        if([401, 403].includes(status)) {
            return {status, error};
        }
        if(status === 502 || retry) {
            return execute(method, url, {...options}, true);
        }

    }
}


export const get = (url,options) => execute('GET', url, options);
export const post = (url,options) => execute('POST', url, options);
export const put = (url,options) => execute('PUT', url, options);
export const deleteResource = (url,options) => execute('DELETE', url, options);

