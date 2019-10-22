
//const { axios } = require("axios");
import axios from 'axios';

const baseApiUrl = 'https://my-json-server.typicode.com/michelle-phan/fakeAPIs/';
const baseApiUrl1 = 'https://m876ampgkh.execute-api.ap-southeast-1.amazonaws.com/dev';


// add app
export const addApp = (app, token) => {

    return new Promise((resolve, reject) => {

        const { name, description, company, facebookClientId, facebookClientSecret } = app;

        axios
            .post(`${baseApiUrl1}/provisions`, null,
            { headers: { Authorization: `Bearer ${token}`} ,
              data: {
                appName: name,
                appInfo: {
                    description: description,
                    company: "ABC Company"
                },
                callbackUrl: "https://enjdkyfy0odvk.x.pipedream.net",
                logoutUrl: "https://enjdkyfy0odvk.x.pipedream.net",
                facebookClient: {
                    client_id: "466080827334160",
                    client_secret: "a475c57454a898495a0187b11a3096fd"
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

export const listApps = (token) => {

    return new Promise((resolve, reject) => {
        axios
            .get(`${baseApiUrl1}/provisions`, { headers: { Authorization: `Bearer ${token}`} })
            .then((result) => {
                resolve(result.data.Items);
                return;
            })
            .catch(error => {
                console.log(error);
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