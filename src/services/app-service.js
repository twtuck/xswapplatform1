
const { axios } = require("axios");
//import axios from 'axios';

const baseApiUrl = 'https://my-json-server.typicode.com/michelle-phan/fakeAPIs/';


// add app
const addApp = (id, name, description = []) => {

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
const findApp = (id) => {
    
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


const findAppsByName = (name) => {

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

const listApps = () => {

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
const removeApp = (id) => {

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
const updateApp = (app) => {
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


//export default findApp;
// exports
module.exports = {
    'addApp': addApp,
    'findApp': findApp,
    'findAppsByName': findAppsByName,
    'listApps': listApps,
    'removeApp': removeApp,
    'updateApp': updateApp
};