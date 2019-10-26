
//const { axios } = require("axios");
import axios from 'axios';

const baseApiUrl = 'https://a6a3klo627.execute-api.ap-southeast-1.amazonaws.com/dev/provisions';


// add app
export const addApp = (app, token) => {

    return new Promise((resolve, reject) => {
        const { name, description, company, facebookClientId, facebookClientSecret } = app;
        axios
            .post(`${baseApiUrl}`, null,
            { headers: { Authorization: `Bearer ${token}`} ,
              data: {
                appName: name,
                appInfo: {
                    description: description,
                    company: company
                },
                callbackUrl: "https://enjdkyfy0odvk.x.pipedream.net",
                logoutUrl: "https://enjdkyfy0odvk.x.pipedream.net",
                facebookClient: {
                    client_id: facebookClientId, //"466080827334160",
                    client_secret: facebookClientSecret //"a475c57454a898495a0187b11a3096fd"
                }
            } })
            .then((result) => {
                resolve(result.data);
            })
            .catch(error => {
                console.log(error);
                reject(error.message);
            });
    });
};


// find apps
export const findApp = (name, token) => {
    
    return new Promise((resolve, reject) => { 
        axios
            .get(`${baseApiUrl}/${name}`, { headers: { Authorization: `Bearer ${token}`} })
            .then((result) => {
                resolve(result.data);
            })
            .catch(error => {
                console.log(error);
                reject(error.message);
            });
    });
};

export const listApps = (token) => {

    return new Promise((resolve, reject) => {
        axios
            .get(`${baseApiUrl}`, { headers: { Authorization: `Bearer ${token}`} })
            .then((result) => {
                resolve(result.data.Items);
            })
            .catch(error => {
                console.log(error);
                reject(error.message);
            });
    });
};


// remove app
export const removeApp = (name, token) => {

    return new Promise((resolve, reject) => { 
        axios
            .delete(`${baseApiUrl}/${name}`, { headers: { Authorization: `Bearer ${token}`} })
            .then((result) => {
                resolve(result.data);
            })
            .catch(error => {
                console.log(error);
                reject(error.message);
            });
    });
};


// update app
export const updateApp = (name, token) => {
    
    return new Promise((resolve, reject) => { 
        axios
            .get(`${baseApiUrl}/${name}`, { headers: { Authorization: `Bearer ${token}`} })
            .then((result) => {
                resolve(result.data);
            })
            .catch(error => {
                console.log(error);
                reject(error.message);
            });
    });
};