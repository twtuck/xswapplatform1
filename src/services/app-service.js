
//const { axios } = require("axios");
import axios from 'axios';

const baseApiUrl = 'https://my-json-server.typicode.com/michelle-phan/fakeAPIs/';


// add app
export const addApp = (id, name, description = []) => {

    return new Promise((resolve, reject) => {
        axios
            .post(`${baseApiUrl}/apps`, { 
                'id': id,
                'name': name,
                'description': description })
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
export const findApp = (id) => {
    
    return new Promise((resolve, reject) => {
        axios
            .get(`${baseApiUrl}/apps/${id}`)
            .then(response => {
                resolve(response.data);
                return;
            })
            .catch(error => {
                reject(error.message);
                return;
            });
    });
    
};


export const findAppsByName = (name) => {

    return new Promise((resolve, reject) => {
        axios
            .get(`${baseApiUrl}/apps?name=${name}`)
            .then(response => {
                resolve(response.data);
                return;
            })
            .catch(error => {
                reject(error.message);
                return;
            });
    });

};

export const listApps = () => {

    return new Promise((resolve, reject) => {
        axios
            .get(`${baseApiUrl}/apps`)
            .then(response => {
                resolve(response.data);
                return;
            })
            .catch(error => {
                reject(error.message);
                return;
            });
    });

};


// remove app
export const removeApp = (id) => {

    return new Promise((resolve, reject) => {
        axios
            .delete(`${baseApiUrl}/apps/${id}`)
            .then(() => {
                resolve();
                return;
            })
            .catch(error => {
                reject(error.message);
                return;
            });
    });

};


// update app
export const updateApp = (app) => {
    return new Promise((resolve, reject) => {
        axios
            .put(`${baseApiUrl}/apps`, {app})
            .then(() => {
                resolve();
                return;
            })
            .catch(error => {
                reject(error.message);
                return;
            });
    });
    
};

// exports
// module.exports = {
//     'addApp': addApp,
//     'findApp': findApp,
//     'findAppsByName': findAppsByName,
//     'listApps': listApps,
//     'removeApp': removeApp,
//     'updateApp': updateApp
// };