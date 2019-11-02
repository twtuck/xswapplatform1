import { API } from 'aws-amplify';
import ls from 'local-storage'
const PlatformService = require('../services/platform-service');

const joseHelper = require('../helpers/joseHelper');

const baseApiUrl = 'provisions/';
const APIName = 'MyAPIGatewayAPI';

// you can dynamically get the server public key by making a GET request from the URL
//      https:/xxxxxxxx.execute-api.ap-southeast-1.amazonaws.com/dev/platform/serverKey
// const serverPublicKey = `-----BEGIN PUBLIC KEY-----\r\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCi/H8+Oize7Y6Y4Fx4Rp9phOSu\r\nY5IcRV+axAFnzPZM6JxA7b7Ufi5urBbezjOVTqwtBCmzkngUyKDjmv35MHSRiv4j\r\nuR5bnwrqE9OhECySdpbE8ZNT9bZUx2u5Y29VuDBQRdkDk4LDcnAInxRYC+Muf6TV\r\nLHGlP/PMeS/m1n1vAQIDAQAB\r\n-----END PUBLIC KEY-----\r\n`;

// add app
export const addApp = (app, token) => {

    return new Promise((resolve, reject) => {
        const {
            name,
            description,
            company,
            facebookClientId,
            facebookClientSecret
        } = app;

        const payload = {
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
        };
        getServerPublicKey((serverPublicKey) => {
            joseHelper.encrypt(serverPublicKey, JSON.stringify(payload))
                .then(jwe => {
                    console.log(jwe);
                    API.post(`${APIName}`, `${baseApiUrl}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                        body: {
                            jwe
                        }
                    })
                .then((result) => {
                    resolve(result);
                })
                .catch(error => {
                    console.log(error);
                    reject(error.message);
                });
            });
        });
    });
};

const getServerPublicKey = (callback) => {
    let serverPublicKey = ls.get('serverPublicKey');
    if (!serverPublicKey) {
        PlatformService.getServerKey().then(response => {
            console.log(response);
            serverPublicKey = response.serverKey;
            callback(serverPublicKey);
        });
        // serverPublicKey = '-----BEGIN PUBLIC KEY-----\r\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCl3TGxb1NNl/zbYF4tzRwfhgLV\r\naWROMZgurnMlpA2EJWbnZRiDaPN7Wdwjm2QgAkie6QIgxE9cpwaaPDQBxc2wtHFh\r\n9SU1yNUexxAbwyFuyn1SIuropw15Mml9nlDno2xlG0XO85BGiqwFNoVrzXp2mHx9\r\npQHB4t3XntLeH0nvfwIDAQAB\r\n-----END PUBLIC KEY-----\r\n';
        // callback(serverPublicKey);
    } else {
        callback(serverPublicKey);
    }
}

// find apps
export const findApp = (name, token) => {

    return new Promise((resolve, reject) => {
        API.get(`${APIName}`, `${baseApiUrl}/${name}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((result) => {
            resolve(result);
        })
        .catch(error => {
            console.log(error);
            reject(error.message);
        });
    });
};

export const listApps = (token) => {

    return new Promise((resolve, reject) => {
        API.get(`${APIName}`, `${baseApiUrl}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((result) => {
            resolve(result.Items);
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
        API.del(`${APIName}`, `${baseApiUrl}${name}`, {
            headers: {
            Authorization: `Bearer ${token}`
            }
        })
        .then((result) => {
            resolve(result);
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
        API.get(`${APIName}`, `${baseApiUrl}/${name}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((result) => {
            resolve(result);
        })
        .catch(error => {
            console.log(error);
            reject(error.message);
        });
    });
};