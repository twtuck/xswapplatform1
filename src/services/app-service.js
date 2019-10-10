
//const { axios } = require("axios");
import axios from 'axios';

const baseApiUrl = 'https://my-json-server.typicode.com/michelle-phan/fakeAPIs/';
const baseApiUrl1 = 'https://h1rqtotbdj.execute-api.ap-southeast-1.amazonaws.com/dev/';


// add app
export const addApp = (id, name, description = []) => {

    return new Promise((resolve, reject) => {
        axios
            .post(`${baseApiUrl1}/apps`, 
            { headers: { Authorization: 'Bearer eyJraWQiOiI2NlptXC84bjhNb0o3XC9iWnhrbGh1K28rNlpkQStUTXZmZm5jZkQrd3o5Ylk9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJhYmZjYjlmMC0yOWI1LTQwZDItYThhZC1iNWYyZDYzMDk3ZmQiLCJjb2duaXRvOmdyb3VwcyI6WyJEZXZlbG9wZXJzIl0sImV2ZW50X2lkIjoiODM5NmVmMjktNDNjYi00OTQxLTk2M2EtOWE4ZDBiZDkxYmRlIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiIsImF1dGhfdGltZSI6MTU3MDczMDMwOSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmFwLXNvdXRoZWFzdC0xLmFtYXpvbmF3cy5jb21cL2FwLXNvdXRoZWFzdC0xX2VtWFd3QTg4eiIsImV4cCI6MTU3MDczMzkwOSwiaWF0IjoxNTcwNzMwMzA5LCJqdGkiOiJkNTc2NzA4Yy1lNDhlLTRiODgtYmE1ZS05NWQzOTQ5ZDFhOTEiLCJjbGllbnRfaWQiOiJwNzY2czhhNXBiajVxbWZyaTh2NjBwOHA2IiwidXNlcm5hbWUiOiJtaWNoZWxsZTEifQ.QGwd_YUIBu5FOkBd61Zwsx5jjxbbuuQh7mozCC49m_zOqXltUqQazWWEY_BvkUa_o8PVpWGvE3nmOeiasZfYZsjAzr5gI9_Dr2qUZ5cj8ZlOznqV90YEWt47jPcRGb48OnzhZclCB_cO7UtjEcUrc4IJijSu1cUKJlgOzMwCB1XhmbrlRxVw29Wh7dp6PNsrf1c3R-Cb3vRtl-JA6oI4mzL10ClU12-AtdBuRvoVdAVsaKbBpX0921lUWwKuf__excaucwO91Dxrffh7JLWp6-nHv4zvfnq8Q4LVkK1VSCriMPi6jYDFjPktcqd7_2ywNqF_smBMUB9P26e7Lva1lQ' } },
            { body: {
                appName: "NewApp4",
                appInfo: {
                    "description": "this is a new reward points exchange app",
                    "company": "ABC Company"
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